-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 20, 2024 at 02:31 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sportevents`
--

-- --------------------------------------------------------

--
-- Table structure for table `archive`
--

CREATE TABLE `archive` (
  `id` int(11) NOT NULL,
  `matchId` int(11) NOT NULL,
  `team1Id` int(11) DEFAULT NULL,
  `team2Id` int(11) DEFAULT NULL,
  `team1Score` int(11) DEFAULT NULL,
  `team2Score` int(11) DEFAULT NULL,
  `status` enum('scheduled','in-progress','completed','canceled') NOT NULL DEFAULT 'scheduled',
  `sporttype` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `winner` varchar(255) DEFAULT NULL,
  `elimination` enum('Single','Double') NOT NULL,
  `nextMatchId` int(11) DEFAULT NULL,
  `tournamentRoundText` varchar(255) DEFAULT NULL,
  `originalId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `archive`
--

INSERT INTO `archive` (`id`, `matchId`, `team1Id`, `team2Id`, `team1Score`, `team2Score`, `status`, `sporttype`, `date`, `winner`, `elimination`, `nextMatchId`, `tournamentRoundText`, `originalId`) VALUES
(36, 1, 1, 2, NULL, NULL, 'scheduled', 'Soccer', '2024-07-02 07:00:00', NULL, 'Single', 5, '1', NULL),
(37, 2, 3, 4, NULL, NULL, 'scheduled', 'Soccer', '2024-07-03 07:00:00', NULL, 'Single', 5, '1', NULL),
(38, 3, 5, 6, NULL, NULL, 'scheduled', 'Soccer', '2024-07-04 07:00:00', NULL, 'Single', 6, '1', NULL),
(39, 4, 7, 8, NULL, NULL, 'scheduled', 'Soccer', '2024-07-05 07:00:00', NULL, 'Single', 6, '1', NULL),
(40, 5, NULL, NULL, NULL, NULL, 'scheduled', 'Soccer', '2021-05-30 00:00:00', NULL, 'Single', 7, 'Semi-Finals', NULL),
(41, 6, NULL, NULL, NULL, NULL, 'scheduled', 'Soccer', '2021-05-30 00:00:00', NULL, 'Single', 7, 'Semi-Finals', NULL),
(42, 7, NULL, NULL, NULL, NULL, 'scheduled', 'Soccer', '2021-05-30 00:00:00', NULL, 'Single', NULL, 'Finals', NULL),
(43, 1, 1, 2, NULL, NULL, 'scheduled', 'Badminton', '2024-07-02 07:14:00', NULL, 'Single', 5, '1', NULL),
(44, 2, 3, 4, NULL, NULL, 'scheduled', 'Badminton', '2024-07-03 07:14:00', NULL, 'Single', 5, '1', NULL),
(45, 3, 5, 6, NULL, NULL, 'scheduled', 'Badminton', '2024-07-04 07:14:00', NULL, 'Single', 6, '1', NULL),
(46, 4, 7, 8, NULL, NULL, 'scheduled', 'Badminton', '2024-07-05 07:14:00', NULL, 'Single', 6, '1', NULL),
(47, 5, NULL, NULL, NULL, NULL, 'scheduled', 'Badminton', '2021-05-30 00:00:00', NULL, 'Single', 7, 'Semi-Finals', NULL),
(48, 6, NULL, NULL, NULL, NULL, 'scheduled', 'Badminton', '2021-05-30 00:00:00', NULL, 'Single', 7, 'Semi-Finals', NULL),
(49, 7, NULL, NULL, NULL, NULL, 'scheduled', 'Badminton', '2021-05-30 00:00:00', NULL, 'Single', NULL, 'Finals', NULL),
(50, 1, 1, 2, NULL, NULL, 'scheduled', 'Badminton', '2024-07-02 07:14:00', NULL, 'Single', 5, '1', NULL),
(51, 2, 3, 4, NULL, NULL, 'scheduled', 'Badminton', '2024-07-03 07:14:00', NULL, 'Single', 5, '1', NULL),
(52, 3, 5, 6, NULL, NULL, 'scheduled', 'Badminton', '2024-07-04 07:14:00', NULL, 'Single', 6, '1', NULL),
(53, 4, 7, 8, NULL, NULL, 'scheduled', 'Badminton', '2024-07-05 07:14:00', NULL, 'Single', 6, '1', NULL),
(54, 5, NULL, NULL, NULL, NULL, 'scheduled', 'Badminton', '2021-05-30 00:00:00', NULL, 'Single', 7, 'Semi-Finals', NULL),
(55, 6, NULL, NULL, NULL, NULL, 'scheduled', 'Badminton', '2021-05-30 00:00:00', NULL, 'Single', 7, 'Semi-Finals', NULL),
(56, 7, NULL, NULL, NULL, NULL, 'scheduled', 'Badminton', '2021-05-30 00:00:00', NULL, 'Single', NULL, 'Finals', NULL),
(57, 1, 1, 2, NULL, NULL, 'scheduled', 'Volleyball', '2024-07-02 09:38:00', NULL, 'Single', 5, '1', NULL),
(58, 2, 3, 4, NULL, NULL, 'scheduled', 'Volleyball', '2024-07-03 09:38:00', NULL, 'Single', 5, '1', NULL),
(59, 3, 5, 6, NULL, NULL, 'scheduled', 'Volleyball', '2024-07-04 09:38:00', NULL, 'Single', 6, '1', NULL),
(60, 4, 7, 8, NULL, NULL, 'scheduled', 'Volleyball', '2024-07-05 09:38:00', NULL, 'Single', 6, '1', NULL),
(61, 5, NULL, NULL, NULL, NULL, 'scheduled', 'Volleyball', '2021-05-30 00:00:00', NULL, 'Single', 7, 'Semi-Finals', NULL),
(62, 6, NULL, NULL, NULL, NULL, 'scheduled', 'Volleyball', '2021-05-30 00:00:00', NULL, 'Single', 7, 'Semi-Finals', NULL),
(63, 7, NULL, NULL, NULL, NULL, 'scheduled', 'Volleyball', '2021-05-30 00:00:00', NULL, 'Single', NULL, 'Finals', NULL),
(64, 1, 1, 2, NULL, NULL, 'scheduled', 'Basketball', '2024-07-07 07:11:00', NULL, 'Single', 5, '1', NULL),
(65, 2, 3, 4, NULL, NULL, 'scheduled', 'Basketball', '2024-07-08 07:11:00', NULL, 'Single', 5, '1', NULL),
(66, 3, 5, 6, NULL, NULL, 'scheduled', 'Basketball', '2024-07-09 07:11:00', NULL, 'Single', 6, '1', NULL),
(67, 4, 7, 8, NULL, NULL, 'scheduled', 'Basketball', '2024-07-09 07:11:00', NULL, 'Single', 6, '1', NULL),
(68, 5, NULL, NULL, NULL, NULL, 'scheduled', 'Basketball', '2021-05-30 00:00:00', NULL, 'Single', 7, 'Semi-Finals', NULL),
(69, 6, NULL, NULL, NULL, NULL, 'scheduled', 'Basketball', '2021-05-30 00:00:00', NULL, 'Single', 7, 'Semi-Finals', NULL),
(70, 7, NULL, NULL, NULL, NULL, 'scheduled', 'Basketball', '2021-05-30 00:00:00', NULL, 'Single', NULL, 'Finals', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `badminton`
--

CREATE TABLE `badminton` (
  `id` int(11) NOT NULL,
  `matchId` int(11) NOT NULL,
  `team1Id` int(11) DEFAULT NULL,
  `team2Id` int(11) DEFAULT NULL,
  `team1Score` int(11) DEFAULT NULL,
  `team2Score` int(11) DEFAULT NULL,
  `status` enum('scheduled','in-progress','completed','canceled') NOT NULL DEFAULT 'scheduled',
  `sporttype` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `winner` varchar(255) DEFAULT NULL,
  `elimination` enum('Single','Double') NOT NULL,
  `nextMatchId` int(11) DEFAULT NULL,
  `tournamentRoundText` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `badminton`
--

INSERT INTO `badminton` (`id`, `matchId`, `team1Id`, `team2Id`, `team1Score`, `team2Score`, `status`, `sporttype`, `date`, `winner`, `elimination`, `nextMatchId`, `tournamentRoundText`) VALUES
(8, 1, 1, 2, 100, 98, 'in-progress', 'Badminton', '2024-07-02 07:14:00', NULL, 'Single', 5, '1'),
(9, 2, 3, 4, NULL, NULL, 'scheduled', 'Badminton', '2024-07-03 07:14:00', NULL, 'Single', 5, '1'),
(10, 3, 5, 6, NULL, NULL, 'scheduled', 'Badminton', '2024-07-04 07:14:00', NULL, 'Single', 6, '1'),
(11, 4, 7, 8, NULL, NULL, 'scheduled', 'Badminton', '2024-07-05 07:14:00', NULL, 'Single', 6, '1'),
(12, 5, NULL, NULL, NULL, NULL, 'scheduled', 'Badminton', '2021-05-30 00:00:00', NULL, 'Single', 7, 'Semi-Finals'),
(13, 6, NULL, NULL, NULL, NULL, 'scheduled', 'Badminton', '2021-05-30 00:00:00', NULL, 'Single', 7, 'Semi-Finals'),
(14, 7, NULL, NULL, NULL, NULL, 'scheduled', 'Badminton', '2021-05-30 00:00:00', NULL, 'Single', NULL, 'Finals');

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `id` int(11) NOT NULL,
  `team1Id` int(11) DEFAULT NULL,
  `team2Id` int(11) DEFAULT NULL,
  `team1Score` int(11) DEFAULT NULL,
  `team2Score` int(11) DEFAULT NULL,
  `status` enum('scheduled','in-progress','completed','canceled') NOT NULL DEFAULT 'scheduled',
  `sporttype` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `winner` varchar(255) DEFAULT NULL,
  `elimination` enum('Single','Double') NOT NULL,
  `nextMatchId` int(11) DEFAULT NULL,
  `matchId` int(11) NOT NULL,
  `tournamentRoundText` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`id`, `team1Id`, `team2Id`, `team1Score`, `team2Score`, `status`, `sporttype`, `date`, `winner`, `elimination`, `nextMatchId`, `matchId`, `tournamentRoundText`) VALUES
(116, 1, 2, 12, 15, 'completed', 'Basketball', '2024-07-07 07:11:00', NULL, 'Single', 5, 1, '1'),
(117, 3, 4, 8, 18, 'completed', 'Basketball', '2024-07-08 07:11:00', NULL, 'Single', 5, 2, '1'),
(118, 5, 6, 100, 90, 'completed', 'Basketball', '2024-07-09 07:11:00', NULL, 'Single', 6, 3, '1'),
(119, 7, 8, 20, 18, 'completed', 'Basketball', '2024-07-09 07:11:00', NULL, 'Single', 6, 4, '1'),
(120, NULL, NULL, NULL, NULL, 'scheduled', 'Basketball', '2021-05-30 00:00:00', NULL, 'Single', 7, 5, 'Semi-Finals'),
(121, NULL, NULL, NULL, NULL, 'scheduled', 'Basketball', '2021-05-30 00:00:00', NULL, 'Single', 7, 6, 'Semi-Finals'),
(122, NULL, NULL, NULL, NULL, 'scheduled', 'Basketball', '2021-05-30 00:00:00', NULL, 'Single', NULL, 7, 'Finals');

-- --------------------------------------------------------

--
-- Table structure for table `participants`
--

CREATE TABLE `participants` (
  `id` int(11) NOT NULL,
  `matchId` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `resultText` varchar(255) DEFAULT NULL,
  `isWinner` tinyint(1) DEFAULT NULL,
  `status` enum('PLAYED','NO_SHOW','WALK_OVER','NO_PARTY') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `soccer`
--

CREATE TABLE `soccer` (
  `id` int(11) NOT NULL,
  `matchId` int(11) NOT NULL,
  `team1Id` int(11) DEFAULT NULL,
  `team2Id` int(11) DEFAULT NULL,
  `team1Score` int(11) DEFAULT NULL,
  `team2Score` int(11) DEFAULT NULL,
  `status` enum('scheduled','in-progress','completed','canceled') NOT NULL DEFAULT 'scheduled',
  `sporttype` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `winner` varchar(255) DEFAULT NULL,
  `elimination` enum('Single','Double') NOT NULL,
  `nextMatchId` int(11) DEFAULT NULL,
  `tournamentRoundText` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `soccer`
--

INSERT INTO `soccer` (`id`, `matchId`, `team1Id`, `team2Id`, `team1Score`, `team2Score`, `status`, `sporttype`, `date`, `winner`, `elimination`, `nextMatchId`, `tournamentRoundText`) VALUES
(29, 1, 1, 2, NULL, NULL, 'scheduled', 'Soccer', '2024-07-02 07:00:00', NULL, 'Single', 5, '1'),
(30, 2, 3, 4, NULL, NULL, 'scheduled', 'Soccer', '2024-07-03 07:00:00', NULL, 'Single', 5, '1'),
(31, 3, 5, 6, NULL, NULL, 'scheduled', 'Soccer', '2024-07-04 07:00:00', NULL, 'Single', 6, '1'),
(32, 4, 7, 8, NULL, NULL, 'scheduled', 'Soccer', '2024-07-05 07:00:00', NULL, 'Single', 6, '1'),
(33, 5, NULL, NULL, NULL, NULL, 'scheduled', 'Soccer', '2021-05-30 00:00:00', NULL, 'Single', 7, 'Semi-Finals'),
(34, 6, NULL, NULL, NULL, NULL, 'scheduled', 'Soccer', '2021-05-30 00:00:00', NULL, 'Single', 7, 'Semi-Finals'),
(35, 7, NULL, NULL, NULL, NULL, 'scheduled', 'Soccer', '2021-05-30 00:00:00', NULL, 'Single', NULL, 'Finals');

-- --------------------------------------------------------

--
-- Table structure for table `sportlist`
--

CREATE TABLE `sportlist` (
  `id` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `sportname` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `badge` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sportlist`
--

INSERT INTO `sportlist` (`id`, `type`, `sportname`, `description`, `slug`, `badge`) VALUES
(1, 'basketball', 'Basketball', 'Mens and Women Category', 'basketball', 'https://i.imgur.com/W2DqeqI.png'),
(2, 'volleyball', 'Volleyball', 'Mens and Women Category', 'volleyball', 'https://i.imgur.com/7XBCCfP.png'),
(3, 'soccer', 'Soccer', 'Mens and Women Category', 'soccer', 'https://i.imgur.com/cQwkQos.png'),
(4, 'badminton', 'Badminton', 'Men and Women Category', 'badminton', 'https://i.imgur.com/Wd0oZ2q.png'),
(5, 'chess', 'Chess', 'Men and Women Category', 'chess', 'https://i.imgur.com/3eCYWkA.png'),
(6, 'table tennis', 'Table Tennis', 'Men and Women Category', 'table-tennis', 'https://i.imgur.com/WiUGb4K.png'),
(7, 'swimming', 'Swimming', 'Men and Women Category', 'swimming', 'https://i.imgur.com/P2xWYrv.png'),
(8, 'athletics', 'Athletics', 'Men and Women Category', 'athletics', 'https://i.imgur.com/UQjVvUe.png'),
(9, 'sepak takraw', 'Sepak Takraw', 'Men and Women Category', 'sepak-takraw', 'https://i.imgur.com/tDzkHYS.png'),
(10, 'dance sports', 'Dance Sports', 'Men and Women Category', 'dance-sports', 'https://i.imgur.com/XOb3ADA.png'),
(11, 'cultural', 'Cultural', 'Group Performance for Cultural', 'cultural', 'https://cdn-icons-png.flaticon.com/128/869/869979.png'),
(12, 'ms and mr', 'Mr. and Mrs. Intramurals', 'Mr. and Mrs. Intramural Category', 'mr-and-mrs-intramurals', 'https://cdn-icons-png.flaticon.com/128/13770/13770175.png');

-- --------------------------------------------------------

--
-- Table structure for table `standings`
--

CREATE TABLE `standings` (
  `id` int(11) NOT NULL,
  `teamName` varchar(255) NOT NULL,
  `sportType` varchar(255) NOT NULL,
  `score` int(11) NOT NULL,
  `season` varchar(255) NOT NULL,
  `collegeName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `standings`
--

INSERT INTO `standings` (`id`, `teamName`, `sportType`, `score`, `season`, `collegeName`) VALUES
(1, 'CAS', 'Basketball', 12, '2024', 'College of Art and Sciences'),
(2, 'CBA', 'Basketball', 15, '2024', 'College of Business Administrations'),
(3, 'COE', 'Basketball', 8, '2024', 'College of Engineering'),
(4, 'CTED', 'Basketball', 18, '2024', 'College of Teacher Education'),
(5, 'CCS', 'Basketball', 100, '2024', 'College of Computer Studies'),
(6, 'CHS', 'Basketball', 90, '2024', 'College of Health Studies'),
(7, 'COE', 'Basketball', 20, '2024', 'College of Criminal Justice Education'),
(8, 'CAF', 'Basketball', 18, '2024', 'College of Accountancy and Finance');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `collegename` varchar(255) NOT NULL,
  `place` int(25) DEFAULT NULL,
  `points` int(255) DEFAULT NULL,
  `is_champion` tinyint(1) DEFAULT 1,
  `slug` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `name`, `logo`, `collegename`, `place`, `points`, `is_champion`, `slug`) VALUES
(1, 'CAS', 'https://i.imgur.com/mE1VzUd.jpg', 'College of Arts and Science', NULL, NULL, 1, 'cas'),
(2, 'CBM', 'https://i.imgur.com/R5nqeMr.jpg', 'College of Business and Management', NULL, NULL, 1, 'cbm'),
(3, 'CE', 'https://i.imgur.com/7p4QWy6.png', 'College of Engineering', NULL, NULL, 1, 'ce'),
(4, 'College of Teacher Education', 'https://i.imgur.com/DVogSbC.jpg', 'College of Teacher Education', NULL, NULL, 1, 'cted'),
(5, 'College of Computer Studies', 'https://i.imgur.com/7WigMFN.png', 'College of Computer Studies', NULL, NULL, 1, 'ccs'),
(6, 'College of Health Science', 'https://i.imgur.com/AzqSXst.jpg', 'College of Health Science', NULL, NULL, 1, 'chs'),
(7, 'College of Criminal Justice Education', 'https://i.imgur.com/H4XqZTq.jpg', 'College of Criminal Justice Education', NULL, NULL, 1, 'ccje'),
(8, 'College of Accountancy and Finance', 'https://i.imgur.com/mtwABYZ.jpg', 'College of Accountancy and Finance', NULL, NULL, 1, 'caf');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `collegeName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `collegeName`) VALUES
(1, 'Johnny', '$2a$10$TrQbsCT/zl5rlto22hEI3eD06/c4bpNVoGwjk0afw.5YS3i4M.Som', 'CAS'),
(2, 'Naps', '$2a$10$lltKh9wVwDx3yUdyILlMy.Hj/JlzTMECOpG/kT07eOms1fa3ogPdW', 'CCS');

-- --------------------------------------------------------

--
-- Table structure for table `volleyball`
--

CREATE TABLE `volleyball` (
  `id` int(11) NOT NULL,
  `matchId` int(11) NOT NULL,
  `team1Id` int(11) DEFAULT NULL,
  `team2Id` int(11) DEFAULT NULL,
  `team1Score` int(11) DEFAULT NULL,
  `team2Score` int(11) DEFAULT NULL,
  `status` enum('scheduled','in-progress','completed','canceled') NOT NULL DEFAULT 'scheduled',
  `sporttype` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `winner` varchar(255) DEFAULT NULL,
  `elimination` enum('Single','Double') NOT NULL,
  `nextMatchId` int(11) DEFAULT NULL,
  `tournamentRoundText` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `volleyball`
--

INSERT INTO `volleyball` (`id`, `matchId`, `team1Id`, `team2Id`, `team1Score`, `team2Score`, `status`, `sporttype`, `date`, `winner`, `elimination`, `nextMatchId`, `tournamentRoundText`) VALUES
(57, 1, 1, 2, NULL, NULL, 'completed', 'Volleyball', '2024-07-02 09:38:00', NULL, 'Single', 5, '1'),
(58, 2, 3, 4, 12, 21, 'in-progress', 'Volleyball', '2024-07-03 09:38:00', NULL, 'Single', 5, '1'),
(59, 3, 5, 6, 6, 9, 'in-progress', 'Volleyball', '2024-07-04 09:38:00', NULL, 'Single', 6, '1'),
(60, 4, 7, 8, NULL, NULL, 'scheduled', 'Volleyball', '2024-07-05 09:38:00', NULL, 'Single', 6, '1'),
(61, 5, NULL, NULL, NULL, NULL, 'scheduled', 'Volleyball', '2021-05-30 00:00:00', NULL, 'Single', 7, 'Semi-Finals'),
(62, 6, NULL, NULL, NULL, NULL, 'scheduled', 'Volleyball', '2021-05-30 00:00:00', NULL, 'Single', 7, 'Semi-Finals'),
(63, 7, NULL, NULL, NULL, NULL, 'scheduled', 'Volleyball', '2021-05-30 00:00:00', NULL, 'Single', NULL, 'Finals');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `archive`
--
ALTER TABLE `archive`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `badminton`
--
ALTER TABLE `badminton`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team1Id` (`team1Id`),
  ADD KEY `team2Id` (`team2Id`);

--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team1Id` (`team1Id`),
  ADD KEY `team2Id` (`team2Id`);

--
-- Indexes for table `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `matchId` (`matchId`),
  ADD KEY `teamId` (`teamId`);

--
-- Indexes for table `soccer`
--
ALTER TABLE `soccer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team1Id` (`team1Id`),
  ADD KEY `team2Id` (`team2Id`);

--
-- Indexes for table `sportlist`
--
ALTER TABLE `sportlist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD UNIQUE KEY `slug_2` (`slug`),
  ADD UNIQUE KEY `slug_3` (`slug`),
  ADD UNIQUE KEY `slug_4` (`slug`),
  ADD UNIQUE KEY `slug_5` (`slug`),
  ADD UNIQUE KEY `slug_6` (`slug`),
  ADD UNIQUE KEY `slug_7` (`slug`),
  ADD UNIQUE KEY `slug_8` (`slug`),
  ADD UNIQUE KEY `slug_9` (`slug`);

--
-- Indexes for table `standings`
--
ALTER TABLE `standings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `volleyball`
--
ALTER TABLE `volleyball`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team1Id` (`team1Id`),
  ADD KEY `team2Id` (`team2Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `archive`
--
ALTER TABLE `archive`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `badminton`
--
ALTER TABLE `badminton`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `participants`
--
ALTER TABLE `participants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `soccer`
--
ALTER TABLE `soccer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `sportlist`
--
ALTER TABLE `sportlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `standings`
--
ALTER TABLE `standings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `volleyball`
--
ALTER TABLE `volleyball`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `badminton`
--
ALTER TABLE `badminton`
  ADD CONSTRAINT `badminton_ibfk_1` FOREIGN KEY (`team1Id`) REFERENCES `teams` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `badminton_ibfk_2` FOREIGN KEY (`team2Id`) REFERENCES `teams` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`team1Id`) REFERENCES `teams` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`team2Id`) REFERENCES `teams` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `participants`
--
ALTER TABLE `participants`
  ADD CONSTRAINT `participants_ibfk_17` FOREIGN KEY (`matchId`) REFERENCES `matches` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `participants_ibfk_18` FOREIGN KEY (`teamId`) REFERENCES `teams` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `soccer`
--
ALTER TABLE `soccer`
  ADD CONSTRAINT `soccer_ibfk_1` FOREIGN KEY (`team1Id`) REFERENCES `teams` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `soccer_ibfk_2` FOREIGN KEY (`team2Id`) REFERENCES `teams` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `volleyball`
--
ALTER TABLE `volleyball`
  ADD CONSTRAINT `volleyball_ibfk_1` FOREIGN KEY (`team1Id`) REFERENCES `teams` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `volleyball_ibfk_2` FOREIGN KEY (`team2Id`) REFERENCES `teams` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
