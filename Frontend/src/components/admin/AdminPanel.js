import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Card, Table, TextInput, Label } from 'flowbite-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // import css for tabs

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [standings, setStandings] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStanding, setSelectedStanding] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, standingsResponse, teamsResponse] = await Promise.all([
          axios.get('http://localhost:9000/api/users'),
          axios.get('http://localhost:9000/api/standings'),
          axios.get('http://localhost:9000/api/teams/list')
        ]);

        setUsers(usersResponse.data);
        setStandings(standingsResponse.data);
        setTeams(teamsResponse.data);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const openEditModal = (standing) => {
    setSelectedStanding(standing);
    setEditMode(true);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setSelectedStanding(null);
    setEditMode(false);
    setModalIsOpen(false);
  };

  const handleEditChange = (e) => {
    setSelectedStanding({
      ...selectedStanding,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:9000/api/standings/${selectedStanding.id}`, selectedStanding);
      const updatedStandings = standings.map(standing =>
        standing.id === response.data.id ? response.data : standing
      );
      setStandings(updatedStandings);
      closeModal();
    } catch (error) {
      setError('Error updating standing');
      console.error('Error updating standing:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <Tabs>
        <TabList>
          <Tab>Users</Tab>
          <Tab>Standings</Tab>
          <Tab>Teams</Tab>
        </TabList>

        <TabPanel>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user) => (
                <Card key={user.id} className="p-4 border border-gray-300">
                  <h3 className="text-lg font-semibold">{user.username}</h3>
                  <p className="text-gray-700">College: {user.collegeName}</p>
                  <Button onClick={() => openModal(user)} className="mt-2">View Details</Button>
                </Card>
              ))}
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Standings</h2>
            <Table>
              <Table.Head>
                <Table.HeadCell>Team Name</Table.HeadCell>
                <Table.HeadCell>Sport Type</Table.HeadCell>
                <Table.HeadCell>Score</Table.HeadCell>
                <Table.HeadCell>Season</Table.HeadCell>
                <Table.HeadCell>College</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {standings.map((standing) => (
                  <Table.Row key={standing.id}>
                    <Table.Cell>{standing.teamName}</Table.Cell>
                    <Table.Cell>{standing.sportType}</Table.Cell>
                    <Table.Cell>{standing.score}</Table.Cell>
                    <Table.Cell>{standing.season}</Table.Cell>
                    <Table.Cell>{standing.collegeName}</Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => openEditModal(standing)} className="mr-2">Edit</Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Teams</h2>
            <Table>
              <Table.Head>
                <Table.HeadCell>Team Name</Table.HeadCell>
                <Table.HeadCell>College</Table.HeadCell>
                <Table.HeadCell>Points</Table.HeadCell>
                <Table.HeadCell>Champion</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {teams.map((team) => (
                  <Table.Row key={team.id}>
                    <Table.Cell>{team.name}</Table.Cell>
                    <Table.Cell>{team.collegename}</Table.Cell>
                    <Table.Cell>{team.points}</Table.Cell>
                    <Table.Cell>{team.is_champion ? 'Yes' : 'No'}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </TabPanel>
      </Tabs>

      <Modal
        show={modalIsOpen}
        onClose={closeModal}
        size="md"
      >
        <Modal.Header>{editMode ? 'Edit Standing' : 'User Details'}</Modal.Header>
        <Modal.Body>
          {editMode ? (
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <Label htmlFor="teamName" value="Team Name" />
                <TextInput
                  id="teamName"
                  name="teamName"
                  value={selectedStanding?.teamName || ''}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="sportType" value="Sport Type" />
                <TextInput
                  id="sportType"
                  name="sportType"
                  value={selectedStanding?.sportType || ''}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="score" value="Score" />
                <TextInput
                  id="score"
                  name="score"
                  type="number"
                  value={selectedStanding?.score || ''}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="season" value="Season" />
                <TextInput
                  id="season"
                  name="season"
                  value={selectedStanding?.season || ''}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="collegeName" value="College Name" />
                <TextInput
                  id="collegeName"
                  name="collegeName"
                  value={selectedStanding?.collegeName || ''}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          ) : (
            <div>
              {selectedUser && (
                <div>
                  <p><strong>Username:</strong> {selectedUser.username}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>College:</strong> {selectedUser.collegeName}</p>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPanel;
