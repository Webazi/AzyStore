-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 22, 2024 at 02:37 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `uc`
--

-- --------------------------------------------------------

--
-- Table structure for table `dosen`
--

CREATE TABLE `dosen` (
  `id` int(11) NOT NULL COMMENT 'halo',
  `nama` varchar(225) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dosen`
--

INSERT INTO `dosen` (`id`, `nama`, `password`, `status`) VALUES
(3, 'aji', 'aji', 'pw'),
(4, 'eqwfa', 'qefwqaesdf', 'ewfsde');

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `id` int(11) NOT NULL,
  `jual` varchar(20) NOT NULL,
  `beli` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`id`, `jual`, `beli`, `status`) VALUES
(99, '121', '122', 'harga'),
(100, '3001', '2300', 'harga'),
(101, '4600', '4200', 'harga'),
(102, '4200', '4600', 'harga');

-- --------------------------------------------------------

--
-- Table structure for table `rek`
--

CREATE TABLE `rek` (
  `id` int(11) NOT NULL,
  `na` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `saldo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rek`
--

INSERT INTO `rek` (`id`, `na`, `pwd`, `saldo`) VALUES
(0, 'aji', 'aji', 109762400),
(2, 'ajiad', 'ajaj', 113700000);

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id` int(200) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jumlah` int(225) NOT NULL,
  `status` text NOT NULL,
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp(),
  `metode` varchar(255) NOT NULL,
  `id_trans` varchar(255) NOT NULL,
  `growID` varchar(255) NOT NULL,
  `world` varchar(255) NOT NULL,
  `lockk` varchar(255) NOT NULL,
  `total` int(11) NOT NULL,
  `bayar` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id`, `nama`, `jumlah`, `status`, `tanggal`, `metode`, `id_trans`, `growID`, `world`, `lockk`, `total`, `bayar`) VALUES
(62, 'IHSAN', 10, 'pending', '2024-07-01 07:41:20', 'credit_card', '3b8v5ewi57rxh1k', 'BuckzKrazy', 'VMUE', 'Blue Gem Lock', 2300000, 'udah di bayar'),
(68, 'Ahmed', 400, 'pending', '2024-07-05 01:11:44', 'paypal', 'uuuqw4ewqzdxqd2', '403', 'AHMEDD', 'Blue Gem Lock', 184000000, 'udah di bayar'),
(69, 'dqwdasd', 111, 'pending', '2024-07-05 04:14:15', 'credit_card', '0l62ra6vp81b9of', 'awdadasda', 'dwaewdas', 'Diamond Lock', 510600, 'udah di bayar'),
(70, 'Aidbaj', 12, 'pending', '2024-07-05 06:06:15', 'paypal', 'w8q34ivwx8s3uxn', 'Briebdb', 'Bdiebdi', 'Diamond Lock', 55200, 'belum di bayar');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dosen`
--
ALTER TABLE `dosen`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rek`
--
ALTER TABLE `rek`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_trans` (`id_trans`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dosen`
--
ALTER TABLE `dosen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'halo', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `rek`
--
ALTER TABLE `rek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
