-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 09, 2024 at 08:37 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gomedics_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_appointments`
--

CREATE TABLE `tbl_appointments` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `user_code` varchar(255) NOT NULL,
  `doctor_code` varchar(255) NOT NULL,
  `appointment_date` varchar(255) NOT NULL,
  `appointment_time` varchar(255) NOT NULL,
  `title` text NOT NULL,
  `attachment` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `remark` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_appointments`
--

INSERT INTO `tbl_appointments` (`id`, `code`, `user_code`, `doctor_code`, `appointment_date`, `appointment_time`, `title`, `attachment`, `status`, `remark`, `createdAt`, `updatedAt`) VALUES
(1, 'ala90klo', 'vjn6znul', 'sweds', '2024-01-18', '08:00:00', 'Tooth Ache', 'ala90klo_75478EFC-05D1-4644-9CB7-53FFDBCC1DE4.jpg', 'Pending', '', '2024-01-16 19:44:20', '2024-01-16 19:44:20'),
(2, 'ahbkdk9i', 'vjn6znul', 'sesweds', '2024-01-18', '07:30:00', 'Body Pain', 'ahbkdk9i_D74B927D-D5CD-4415-B446-166AF757F15A.jpg', 'Pending', '', '2024-01-16 19:55:44', '2024-01-16 19:55:44'),
(3, 'a8xeay7p', 'vjn6znul', 'sesweds', '2024-01-22', '09:30:00', 'Eye Problem', '', 'Completed', '', '2024-01-16 20:02:45', '2024-01-16 20:02:45'),
(4, 'a7f9nulc', 'vjn6znul', 'sesweds', '2024-01-21', '08:00:00', 'Sweat of palm', '', 'Completed', '', '2024-01-16 20:04:12', '2024-01-16 20:04:12'),
(5, 'ajz6spik', 'vjn6znul', 'sesweds', '2024-01-29', '07:30:00', 'Sweat of palm', '', 'Pending', '', '2024-01-16 20:04:34', '2024-01-16 20:04:34'),
(6, 'ayg96jx1', 'vjn6znul', 'sgghhstsg', '2024-01-28', '11:00:00', 'Yello Label', '', 'Pending', '', '2024-01-16 20:06:27', '2024-01-16 20:06:27');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_categories`
--

CREATE TABLE `tbl_categories` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `color` varchar(200) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_categories`
--

INSERT INTO `tbl_categories` (`id`, `code`, `title`, `color`, `image_url`, `createdAt`, `updatedAt`) VALUES
(1, 'j817ner', 'OTC Medicine', '#FF56T7', 'covid.png', '2024-01-25 17:29:13', '2024-01-25 17:29:13'),
(2, 'j817ne', 'Diabetes Medicine', '#FF56T7', 'medicine.png', '2024-01-25 17:30:21', '2024-01-25 17:30:21'),
(3, 'j817r', 'Baby & Mother', '#FF56T7', 'baby.png', '2024-01-25 17:30:37', '2024-01-25 17:30:37'),
(4, 'j817ners', 'Personal Care', '#FF56T7', 'care.png', '2024-01-25 17:30:49', '2024-01-25 17:30:49'),
(5, 'sde', 'Out Patient Care', '#FF56T7', 'd.png', '2024-01-25 17:31:01', '2024-01-25 17:31:01');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_doctors`
--

CREATE TABLE `tbl_doctors` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) NOT NULL,
  `speciality` text DEFAULT '[]',
  `specification` text DEFAULT '[]',
  `about` text DEFAULT NULL,
  `service` text DEFAULT '[]',
  `date_started` date DEFAULT NULL,
  `job_title` varchar(255) DEFAULT NULL,
  `office` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `fees` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_doctors`
--

INSERT INTO `tbl_doctors` (`id`, `code`, `fullname`, `email`, `gender`, `password`, `image_url`, `telephone`, `speciality`, `specification`, `about`, `service`, `date_started`, `job_title`, `office`, `category`, `experience`, `fees`, `status`, `latitude`, `longitude`, `createdAt`, `updatedAt`) VALUES
(1, 'sgghhstsg', 'Adeleke Opeyemi Mansoor', 'opeyemiademon@gmail.com', 'Male', '$2b$10$3bdwaoZFtodACXa/G7n1aO1tPp57UhfPQ4pLp37GpilHvRU1Wri9S', NULL, '08032950881', '[]', '[]', 'This is just a little details about me', '[]', '2000-10-12', 'Cardiac Surgeon', 'Federal Medical Center, Keffi', 'Doctors', NULL, '2000', 'Active', NULL, NULL, '2023-12-24 09:36:05', '2023-12-24 13:00:18'),
(2, 'sgtsg', 'Dr. Joseph Williamson', 'opeyemiademon@gmail.com', NULL, '$2b$10$6WVeaJ9PTr.14kzi7VeDzOI9YBOwARU9FDytavXTE9bkKnLp3x6fa', NULL, '08032950881', '[{\n  \"code\":\"1\",\n  \"name\":\"Hypertension Treatment\"\n},\n{\n  \"code\":\"2\",\n  \"name\":\"COPD Treatment\"\n\n},\n{\n  \"code\":\"3\",\n  \"name\":\"Diabetes Management\"\n\n},\n{\n  \"code\":\"4\",\n  \"name\":\"Obesity Treatment\"\n\n}]', '[]', NULL, '[{\n  \"code\":\"1\",\n  \"name\":\"Apple Hospital\",\n  \"address\":\"JJ Towers, Johnson street, Hemilton\"\n},\n{\n  \"code\":\"2\",\n  \"name\":\"Seven Star Clinic\",\n  \"address\":\"Hemilton Bridge City Point, Hemilton\"\n\n},\n{\n  \"code\":\"3\",\n  \"name\":\"FMC Clinic Lafia\",\n  \"address\":\"Hemilton Bridge City Point, Hemilton\"\n\n}]', '2011-12-11', 'Cardiac Surgeon', 'Apple Hospital', 'Surgeon', NULL, NULL, 'Active', NULL, NULL, '2023-12-24 18:36:31', '2023-12-24 18:36:31'),
(3, 'swdedsd', 'Dr. Anglina Taylor', 'opeyemiademon@gmail.com', NULL, '$2b$10$up9TZ2sNVzj89JGwQxEkDeUKPys0nq3qRtl75.lxuqWFDQQUugn8G', NULL, '08032950881', '[{\n  \"code\":\"1\",\n  \"name\":\"Hypertension Treatment\"\n},\n{\n  \"code\":\"2\",\n  \"name\":\"COPD Treatment\"\n\n},\n{\n  \"code\":\"3\",\n  \"name\":\"Diabetes Management\"\n\n},\n{\n  \"code\":\"4\",\n  \"name\":\"Obesity Treatment\"\n\n}]', '[]', NULL, '[{\n  \"code\":\"1\",\n  \"name\":\"Apple Hospital\",\n  \"address\":\"JJ Towers, Johnson street, Hemilton\"\n},\n{\n  \"code\":\"2\",\n  \"name\":\"Seven Star Clinic\",\n  \"address\":\"Hemilton Bridge City Point, Hemilton\"\n\n},\n{\n  \"code\":\"3\",\n  \"name\":\"FMC Clinic Lafia\",\n  \"address\":\"Hemilton Bridge City Point, Hemilton\"\n\n}]', NULL, 'Doctor', NULL, 'Therapist', NULL, '3000', 'Active', NULL, NULL, '2023-12-24 18:37:42', '2023-12-24 18:37:42'),
(4, 'sweds', 'Dr. Elina George', 'opeyemiademon@gmail.com', NULL, '$2b$10$njfQ68wi0PNMWZClPswl2OMP8NbFiGrUKedOmujRODG.4iESgVIfu', NULL, '08032950881', '[{\n  \"code\":\"1\",\n  \"name\":\"Hypertension Treatment\"\n},\n{\n  \"code\":\"2\",\n  \"name\":\"COPD Treatment\"\n\n},\n{\n  \"code\":\"3\",\n  \"name\":\"Diabetes Management\"\n\n},\n{\n  \"code\":\"4\",\n  \"name\":\"Obesity Treatment\"\n\n}]', '[]', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos repudiandae eveniet repellat explicabo odit ex cum, laborum nemo animi accusantium cupiditate possimus quasi asperiores iste dicta expedita aliquid, temporibus itaque?', '[{\n  \"code\":\"1\",\n  \"name\":\"Apple Hospital\",\n  \"address\":\"JJ Towers, Johnson street, Hemilton\"\n},\n{\n  \"code\":\"2\",\n  \"name\":\"Seven Star Clinic\",\n  \"address\":\"Hemilton Bridge City Point, Hemilton\"\n\n},\n{\n  \"code\":\"3\",\n  \"name\":\"FMC Clinic Lafia\",\n  \"address\":\"Hemilton Bridge City Point, Hemilton\"\n\n}]', NULL, 'Doctor', 'Apple Hospital', 'Addiction Psychiatrist', NULL, '2500', 'Active', NULL, NULL, '2023-12-24 18:38:09', '2023-12-24 18:38:09'),
(5, 'sesweds', 'Dr. Anthony Peterson', 'opeyemiademon@gmail.com', NULL, '$2b$10$IcUXk3ejooa8OATDxxA8SuUSd1RW3hXU5fdlfhB1LOxAZsMZaFc3O', NULL, '08032950881', '[{\n  \"code\":\"1\",\n  \"name\":\"Hypertension Treatment\"\n},\n{\n  \"code\":\"2\",\n  \"name\":\"COPD Treatment\"\n\n},\n{\n  \"code\":\"3\",\n  \"name\":\"Diabetes Management\"\n\n},\n{\n  \"code\":\"4\",\n  \"name\":\"Obesity Treatment\"\n\n}]', '[]', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos repudiandae eveniet repellat explicabo odit ex cum, laborum nemo animi accusantium cupiditate possimus quasi asperiores iste dicta expedita aliquid, temporibus itaque?', '[{\n  \"code\":\"1\",\n  \"name\":\"Apple Hospital\",\n  \"address\":\"JJ Towers, Johnson street, Hemilton\"\n},\n{\n  \"code\":\"2\",\n  \"name\":\"Seven Star Clinic\",\n  \"address\":\"Hemilton Bridge City Point, Hemilton\"\n\n},\n{\n  \"code\":\"3\",\n  \"name\":\"FMC Clinic Lafia\",\n  \"address\":\"Hemilton Bridge City Point, Hemilton\"\n\n}]', NULL, 'Cardiac Surgeon', 'FMC, Keffi', 'Addiction Psychiatrist', NULL, NULL, 'Active', NULL, NULL, '2023-12-24 18:38:29', '2023-12-24 18:38:29');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_doctors_departments`
--

CREATE TABLE `tbl_doctors_departments` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `department_code` varchar(255) NOT NULL,
  `doctor_code` varchar(255) NOT NULL,
  `hospital_code` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_doctors_departments`
--

INSERT INTO `tbl_doctors_departments` (`id`, `code`, `department_code`, `doctor_code`, `hospital_code`, `status`, `remark`, `createdAt`, `updatedAt`) VALUES
(1, 'dhdgd', 'cdc', 'sgtsg', 'lpgyhu0u', 'Active', NULL, '2024-01-22 17:22:26', '2024-01-22 17:22:26'),
(2, 'dhdgdy', 'cdc', 'swdedsd', 'lpgyhu0u', 'Active', NULL, '2024-01-22 17:23:01', '2024-01-22 17:23:01'),
(3, 'ddhdgdt', 'drcdc', 'sgghhstsg', 'lpgyhu0u', 'Active', NULL, '2024-01-22 17:24:01', '2024-01-22 17:24:01'),
(4, 'eddhdgd', 'drcdc', 'sweds', 'lpgyhu0u', 'Active', NULL, '2024-01-22 17:24:17', '2024-01-22 17:24:17');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_doctor_specialities`
--

CREATE TABLE `tbl_doctor_specialities` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `color_code` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_doctor_specialities`
--

INSERT INTO `tbl_doctor_specialities` (`id`, `code`, `title`, `color_code`, `icon`, `createdAt`, `updatedAt`) VALUES
(1, 'jduf', 'Addiction Psychiatrist', '', '', '2023-12-24 14:37:15', '2023-12-24 14:37:15'),
(2, 'tjdof', 'Adolescent medicine specialist', '', '', '2023-12-24 14:38:02', '2023-12-24 14:38:02'),
(3, 'utjdof', 'Allergist (Immunologist)', '', '', '2023-12-24 14:38:35', '2023-12-24 14:38:35'),
(4, 'utrof', 'Therapist', '', '', '2023-12-24 14:39:10', '2023-12-24 14:39:10'),
(5, 'utrof', 'Aturvedic', '#dgfd', 'dhdbg', '2023-12-24 14:53:41', '2023-12-24 14:53:41');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_hospitals`
--

CREATE TABLE `tbl_hospitals` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `hospital_name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `map` text NOT NULL,
  `latitude` text NOT NULL,
  `longitude` text NOT NULL,
  `category` text NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `facility` text NOT NULL,
  `department` text NOT NULL,
  `about` text NOT NULL,
  `image_list` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_hospitals`
--

INSERT INTO `tbl_hospitals` (`id`, `code`, `hospital_name`, `address`, `map`, `latitude`, `longitude`, `category`, `status`, `telephone`, `email`, `facility`, `department`, `about`, `image_list`, `createdAt`, `updatedAt`) VALUES
(1, 'lpgyhu0u', 'Federal Medical Center', 'Keffi, Nasarawa State', '', '1500', '236584152', 'General Hospital', 'Pending', '08032950881', 'fmc@gmail.com', '[{\n    \"id\":\"1\",\n    \"title\":\"Minor OT/Dressing Room\"\n},\n{\n    \"id\":\"2\",\n    \"title\":\"Emergency Ward\"\n},\n{\n    \"id\":\"3\",\n    \"title\":\"DRadiology/X-ray facility\"\n},\n{\n    \"id\":\"4\",\n    \"title\":\"Laboratory Services\"\n},\n{\n    \"id\":\"5\",\n    \"title\":\"Ambulance Services\"\n}\n]', '[{\n    \"id\":1,\n    \"code\":\"cdc\",\n    \"title\":\"Cardiology Department\",\n    \"status\":\"false\"\n},\n{\n    \"id\":2,\n    \"code\":\"drcdc\",\n    \"title\":\"Oncology Department\",\n    \"status\":\"false\"\n}\n]', 'This is about the hospital', '[{\n    \"id\":1,\n    \"image_url\":\"hos.jpeg\",\n    \"status\":\"Active\"\n},{\n    \"id\":2,\n    \"image_url\":\"profile.jpg\",\n    \"status\":\"Active\"\n},{\n    \"id\":3,\n    \"image_url\":\"hospital.avif\",\n    \"status\":\"Active\"\n}]', '2024-01-17 03:32:43', '2024-01-17 03:32:43'),
(2, 'lpgyhu', 'Tab \'N\' More', 'Wuye Area, Federal Capital Teritory', '', '1500', '236584152', 'Private Hospital', 'Pending', '08032950881', 'fmc@gmail.com', '[{\n    \"id\":\"1\",\n    \"title\":\"Minor OT/Dressing Room\"\n},\n{\n    \"id\":\"2\",\n    \"title\":\"Emergency Ward\"\n},\n{\n    \"id\":\"3\",\n    \"title\":\"DRadiology/X-ray facility\"\n},\n{\n    \"id\":\"4\",\n    \"title\":\"Laboratory Services\"\n},\n{\n    \"id\":\"5\",\n    \"title\":\"Ambulance Services\"\n}\n]', '[{\n    \"id\":1,\n    \"code\":\"cdc\",\n    \"title\":\"Cardiology Department\",\n    \"status\":\"false\"\n},\n{\n    \"id\":2,\n    \"code\":\"drcdc\",\n    \"title\":\"Oncology Department\",\n    \"status\":\"false\"\n}\n]', 'This is about the hospital', '[{\n    \"id\":1,\n    \"image_url\":\"hos.jpeg\",\n    \"status\":\"Active\"\n},{\n    \"id\":2,\n    \"image_url\":\"profile.jpg\",\n    \"status\":\"Active\"\n},{\n    \"id\":3,\n    \"image_url\":\"hospital.avif\",\n    \"status\":\"Active\"\n}]', '2024-01-17 03:34:59', '2024-01-17 03:34:59'),
(3, 'plpgyhu', 'NSUk Pharmacy', ' 34 Crescent, Garki Abuja', '', '1500', '236584152', 'General Hospital', 'Pending', '08032950881', 'fmc@gmail.com', '[{\n    \"id\":\"1\",\n    \"title\":\"Minor OT/Dressing Room\"\n},\n{\n    \"id\":\"2\",\n    \"title\":\"Emergency Ward\"\n},\n{\n    \"id\":\"3\",\n    \"title\":\"DRadiology/X-ray facility\"\n},\n{\n    \"id\":\"4\",\n    \"title\":\"Laboratory Services\"\n},\n{\n    \"id\":\"5\",\n    \"title\":\"Ambulance Services\"\n}\n]', '[{\n    \"id\":1,\n    \"code\":\"cdc\",\n    \"title\":\"Cardiology Department\",\n    \"status\":\"false\"\n},\n{\n    \"id\":2,\n    \"code\":\"drcdc\",\n    \"title\":\"Oncology Department\",\n    \"status\":\"false\"\n}\n]', 'This is about the hospital', '[{\n    \"id\":1,\n    \"image_url\":\"hos.jpeg\",\n    \"status\":\"Active\"\n},{\n    \"id\":2,\n    \"image_url\":\"profile.jpg\",\n    \"status\":\"Active\"\n},{\n    \"id\":3,\n    \"image_url\":\"hospital.avif\",\n    \"status\":\"Active\"\n}]', '2024-01-17 03:35:57', '2024-01-17 03:35:57'),
(4, 'plpgyhud', 'HMEDIX Pharmacy', ' 3rd Avenue, 34 Crescent, Garki Abuja', '', '1500', '236584152', 'General Hospital', 'Pending', '08032950881', 'fmc@gmail.com', '[{\n    \"id\":\"1\",\n    \"title\":\"Minor OT/Dressing Room\"\n},\n{\n    \"id\":\"2\",\n    \"title\":\"Emergency Ward\"\n},\n{\n    \"id\":\"3\",\n    \"title\":\"DRadiology/X-ray facility\"\n},\n{\n    \"id\":\"4\",\n    \"title\":\"Laboratory Services\"\n},\n{\n    \"id\":\"5\",\n    \"title\":\"Ambulance Services\"\n}\n]', '[{\n    \"id\":1,\n    \"code\":\"cdc\",\n    \"title\":\"Cardiology Department\",\n    \"status\":\"false\"\n},\n{\n    \"id\":2,\n    \"code\":\"drcdc\",\n    \"title\":\"Oncology Department\",\n    \"status\":\"false\"\n}\n]', 'This is about the hospital', '[{\n    \"id\":1,\n    \"image_url\":\"hos.jpeg\",\n    \"status\":\"Active\"\n},{\n    \"id\":2,\n    \"image_url\":\"profile.jpg\",\n    \"status\":\"Active\"\n},{\n    \"id\":3,\n    \"image_url\":\"hospital.avif\",\n    \"status\":\"Active\"\n}]', '2024-01-17 03:36:32', '2024-01-17 03:36:32'),
(5, 'uigyhu', 'Go Pharmacy', ' Halibiz Plaza, Keffi, Nasarawa', '', '1500', '236584152', 'General Hospital', 'Pending', '08032950881', 'fmc@gmail.com', '[{\n    \"id\":\"1\",\n    \"title\":\"Minor OT/Dressing Room\"\n},\n{\n    \"id\":\"2\",\n    \"title\":\"Emergency Ward\"\n},\n{\n    \"id\":\"3\",\n    \"title\":\"DRadiology/X-ray facility\"\n},\n{\n    \"id\":\"4\",\n    \"title\":\"Laboratory Services\"\n},\n{\n    \"id\":\"5\",\n    \"title\":\"Ambulance Services\"\n}\n]', '[{\n    \"id\":1,\n    \"code\":\"cdc\",\n    \"title\":\"Cardiology Department\",\n    \"status\":\"false\"\n},\n{\n    \"id\":2,\n    \"code\":\"drcdc\",\n    \"title\":\"Oncology Department\",\n    \"status\":\"false\"\n}\n]', 'This is about the hospital', '[{\n    \"id\":1,\n    \"image_url\":\"hos.jpeg\",\n    \"status\":\"Active\"\n},{\n    \"id\":2,\n    \"image_url\":\"profile.jpg\",\n    \"status\":\"Active\"\n},{\n    \"id\":3,\n    \"image_url\":\"hospital.avif\",\n    \"status\":\"Active\"\n}]', '2024-01-17 03:44:02', '2024-01-17 03:44:02'),
(6, 'deuigyhu', 'Hamzat Pharmacy', ' Federal Capital Abuja', '', '1500', '236584152', 'General Hospital', 'Pending', '08032950881', 'habzat@gmail.com', '[]', '[]', 'This is about the hospital', '[]', '2024-01-30 03:27:08', '2024-01-30 03:27:08');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_labs`
--

CREATE TABLE `tbl_labs` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `lab_name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `latitude` text NOT NULL,
  `longitude` text NOT NULL,
  `image_url` text NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `about` text NOT NULL,
  `facility` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_labs`
--

INSERT INTO `tbl_labs` (`id`, `code`, `lab_name`, `address`, `latitude`, `longitude`, `image_url`, `status`, `telephone`, `email`, `about`, `facility`, `createdAt`, `updatedAt`) VALUES
(1, 'lpgydehu0u', 'Helocom Labs', 'Keffi, Nasarawa State', '1500', '236584152', '', 'Active', '08032950881', 'fmc@gmail.com', 'This is about the hospital', '[{\n    \"id\":\"1\",\n    \"title\":\"Minor OT/Dressing Room\"\n},\n{\n    \"id\":\"2\",\n    \"title\":\"Emergency Ward\"\n},\n{\n    \"id\":\"3\",\n    \"title\":\"DRadiology/X-ray facility\"\n},\n{\n    \"id\":\"4\",\n    \"title\":\"Laboratory Services\"\n},\n{\n    \"id\":\"5\",\n    \"title\":\"Ambulance Services\"\n}\n]', '2024-01-23 04:52:11', '2024-01-23 04:52:11'),
(2, 'dgtdf', 'City Cure Labs', 'Willington Bridge', '1500', '236584152', '', 'Active', '08032950881', 'fmc@gmail.com', 'This is about the hospital', '[{\n    \"id\":\"1\",\n    \"title\":\"Minor OT/Dressing Room\"\n},\n{\n    \"id\":\"2\",\n    \"title\":\"Emergency Ward\"\n},\n{\n    \"id\":\"3\",\n    \"title\":\"DRadiology/X-ray facility\"\n},\n{\n    \"id\":\"4\",\n    \"title\":\"Laboratory Services\"\n},\n{\n    \"id\":\"5\",\n    \"title\":\"Ambulance Services\"\n}\n]', '2024-01-23 04:53:16', '2024-01-23 04:53:16'),
(3, 'dgtdfdd', '24x7 Test Point', 'Willington Bridge', '1500', '236584152', '', 'Active', '08032950881', 'fmc@gmail.com', 'This is about the hospital', '[{\n    \"id\":\"1\",\n    \"title\":\"Minor OT/Dressing Room\"\n},\n{\n    \"id\":\"2\",\n    \"title\":\"Emergency Ward\"\n},\n{\n    \"id\":\"3\",\n    \"title\":\"DRadiology/X-ray facility\"\n},\n{\n    \"id\":\"4\",\n    \"title\":\"Laboratory Services\"\n},\n{\n    \"id\":\"5\",\n    \"title\":\"Ambulance Services\"\n}\n]', '2024-01-23 04:53:38', '2024-01-23 04:53:38');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_lab_tests`
--

CREATE TABLE `tbl_lab_tests` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `lab_code` varchar(255) NOT NULL,
  `title` text NOT NULL,
  `fees` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_lab_tests`
--

INSERT INTO `tbl_lab_tests` (`id`, `code`, `lab_code`, `title`, `fees`, `createdAt`, `updatedAt`) VALUES
(1, 'lpgydehu0u', 'lpgydehu0u', 'Wilder Test', '1500', '2024-01-23 04:55:53', '2024-01-23 04:55:53'),
(2, 'dg0u', 'lpgydehu0u', 'Basic Methabolic Panel', '1500', '2024-01-23 04:56:26', '2024-01-23 04:56:26'),
(3, 'ddg0u', 'lpgydehu0u', 'Lipid Panel', '1000', '2024-01-23 04:56:40', '2024-01-23 04:56:40'),
(4, 'yddg0u', 'lpgydehu0u', 'Thyroid Simulating Hormpne', '3000', '2024-01-23 04:57:04', '2024-01-23 04:57:04');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_orders`
--

CREATE TABLE `tbl_orders` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `user_code` varchar(255) NOT NULL,
  `vendor_code` varchar(255) NOT NULL,
  `wallet` varchar(255) NOT NULL,
  `date_order` datetime DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `ground_total` varchar(255) NOT NULL,
  `rider_code` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `subtotal` varchar(255) DEFAULT NULL,
  `service_charge` varchar(255) DEFAULT NULL,
  `items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`items`)),
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order_items`
--

CREATE TABLE `tbl_order_items` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `order_code` varchar(255) NOT NULL,
  `user_code` varchar(255) NOT NULL,
  `vendor_code` varchar(255) NOT NULL,
  `product_code` varchar(255) NOT NULL,
  `qty` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `unit` varchar(255) NOT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `date_order` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_payments`
--

CREATE TABLE `tbl_payments` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `wallet` varchar(255) NOT NULL,
  `user_code` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `discount` varchar(255) DEFAULT NULL,
  `method` varchar(255) NOT NULL,
  `payer` varchar(255) DEFAULT NULL,
  `total_item` varchar(255) NOT NULL,
  `date_paid` datetime DEFAULT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `payment_data` varchar(255) DEFAULT '[]',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pharmacy_products`
--

CREATE TABLE `tbl_pharmacy_products` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `pharmacy_code` varchar(255) NOT NULL,
  `staff_code` varchar(255) NOT NULL,
  `image_url` text DEFAULT NULL,
  `product_id` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `category_code` varchar(255) NOT NULL,
  `subcategory_code` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `require_prescription` tinyint(1) DEFAULT 0,
  `price` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `qty` varchar(200) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_pharmacy_products`
--

INSERT INTO `tbl_pharmacy_products` (`id`, `code`, `pharmacy_code`, `staff_code`, `image_url`, `product_id`, `product_name`, `category_code`, `subcategory_code`, `description`, `require_prescription`, `price`, `qty`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'p18we0jm', 'v9gc6mpq', 'staff', 'p18we0jm_0EC6E745-B43A-4782-A2D3-B016FF3BE9CC.jpg', '56747', 'Paracetalmol', 'j817r', 'dsgpgtr', 'This is a very nice drugs', 1, '200', '', 'Pending', '2024-01-26 16:50:38', '2024-01-26 16:50:38'),
(2, 'phkvn2l2', 'v9gc6mpq', 'staff', 'phkvn2l2_FCBB39FD-C253-45F8-8036-7FF66391A800.jpg', '46578', 'Ampiclux', 'j817ner', 'fdfr78s', 'Another wonderful drugs', 0, '150', '', 'Pending', '2024-01-26 17:15:31', '2024-01-26 17:15:31'),
(3, 'pc5asbfo', 'v9gc6mpq', 'staff', 'pc5asbfo_F711946E-9995-4687-A5EA-0671B064A401.jpg', '6t567', 'Aceptamin', 'j817r', 'dsgpgtr', 'No details found', 1, '590', '', 'Pending', '2024-01-26 17:19:32', '2024-01-26 17:19:32'),
(4, 'pfnd3f6t', 'v9gc6mpq', 'staff', 'pfnd3f6t_C0795460-5287-4182-9CDD-CA95CC97CAE3.jpg', '89594', 'Husha Water', 'j817r', 'dsgpgtr', 'This i sme just doing my things', 1, '450', 'Pack of 2', 'Pending', '2024-01-27 03:15:55', '2024-01-27 03:25:02');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pharmacy_products_categories`
--

CREATE TABLE `tbl_pharmacy_products_categories` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `parent_code` varchar(255) NOT NULL DEFAULT '001',
  `pharmacy_code` varchar(255) NOT NULL,
  `staff_code` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `category_name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pharmacy_stores`
--

CREATE TABLE `tbl_pharmacy_stores` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `store_name` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  `wallet` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `map_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`map_data`)),
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_pharmacy_stores`
--

INSERT INTO `tbl_pharmacy_stores` (`id`, `code`, `image_url`, `store_name`, `telephone`, `password`, `email_address`, `wallet`, `address`, `longitude`, `latitude`, `map_data`, `createdAt`, `updatedAt`) VALUES
(1, 'v9gc6mpq', '', 'Well Life Store', '08032950881', '$2b$10$OrTczBINofy.gGJpPdMTo.lSSH7cyp05Lfia7iC7TqzJREJah8ZCK', 'opeyemiademon@gmail.com', '0984839302', '17, Gwarimpa Abuja', '', '', '\"[]\"', '2023-12-24 15:28:41', '2023-12-24 15:28:41'),
(2, 'vg1fwi4v', '', 'Tab N More', '080329508813', '$2b$10$8dOawq142xj2ubyMNSIgIOklyBGIBLOwc8T0v0yq67d5Y3mNzj.wy', 'opeyemiademon1@gmail.com', '0228728732', 'BCG, Area One Abuja', '', '', '\"[]\"', '2023-12-24 15:29:50', '2023-12-24 15:29:50'),
(3, 'vpjppuw8', '', 'Admotron Solutions', '080329508812', '$2b$10$c28qfpq8fvGrpihsCPHYkOrpoIrHqddspwS5HHNu7zslb/2/8Y.ki', 'opeyemiademon2@gmail.com', '5315756634', 'Nasarawa State University, Keffi, Nasarawa Nigeria', '', '', '\"[]\"', '2023-12-24 17:06:29', '2023-12-24 17:06:29'),
(4, 'vt0w2gaw', '', 'NSUK Pharmacy', '080329508814', '$2b$10$41dX.GtYBg8bONfgywmNq.1EK0YzSjeeyhp.PqVp.WK7c5zjkzxZ2', 'opeyemidemon3@gmail.com', '6970261256', '', '', '', '\"[]\"', '2023-12-25 10:00:53', '2023-12-25 10:00:53');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_reminders`
--

CREATE TABLE `tbl_reminders` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `user_code` varchar(255) NOT NULL,
  `pill_name` varchar(255) NOT NULL,
  `day` text NOT NULL,
  `time` text NOT NULL,
  `unique_code` varchar(255) NOT NULL,
  `days` text NOT NULL,
  `times` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_reviews`
--

CREATE TABLE `tbl_reviews` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `review_type` varchar(255) NOT NULL,
  `review_user_code` varchar(255) NOT NULL,
  `user_code` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `rating` varchar(255) NOT NULL,
  `reviewed_for` varchar(255) DEFAULT NULL,
  `date_review` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_riders`
--

CREATE TABLE `tbl_riders` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) NOT NULL,
  `wallet` varchar(255) NOT NULL,
  `online_status` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sub_categories`
--

CREATE TABLE `tbl_sub_categories` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `main_code` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_sub_categories`
--

INSERT INTO `tbl_sub_categories` (`id`, `code`, `main_code`, `title`, `createdAt`, `updatedAt`) VALUES
(1, 'ljcp94h', 'j817ner', 'Sexual Wellness', '2024-01-25 18:56:29', '2024-01-25 18:56:29'),
(2, 'tw4m0b1', 'j817ner', 'Pain Releif', '2024-01-25 18:56:50', '2024-01-25 18:56:50'),
(3, 'fdfr78s', 'j817ner', 'Body Balm', '2024-01-25 18:57:09', '2024-01-25 18:57:09'),
(4, 'dsgpgtr', 'j817r', 'Body Balm', '2024-01-25 18:57:27', '2024-01-25 18:57:27'),
(5, '72scoel', 'j817r', 'Man Power', '2024-01-25 18:57:38', '2024-01-25 18:57:38'),
(6, 'eslqd7d', 'j817r', 'Pregnancy', '2024-01-25 18:57:48', '2024-01-25 18:57:48');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_test_bookings`
--

CREATE TABLE `tbl_test_bookings` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `order_code` varchar(255) NOT NULL,
  `user_code` varchar(255) NOT NULL,
  `lab_code` varchar(255) NOT NULL,
  `test_code` varchar(255) NOT NULL,
  `fees` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `date_order` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_test_booking_summaries`
--

CREATE TABLE `tbl_test_booking_summaries` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `user_code` varchar(255) NOT NULL,
  `order_code` varchar(255) NOT NULL,
  `subtotal` varchar(255) NOT NULL,
  `charge` varchar(255) NOT NULL,
  `date_book` varchar(255) NOT NULL,
  `time_book` varchar(255) NOT NULL,
  `total` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `wallet` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `password` text NOT NULL,
  `is_phone_verified` tinyint(1) NOT NULL,
  `is_email_verified` tinyint(1) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `user_group` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `code`, `fullname`, `email_address`, `telephone`, `wallet`, `image_url`, `password`, `is_phone_verified`, `is_email_verified`, `status`, `user_group`, `createdAt`, `updatedAt`) VALUES
(1, 'vjn6znul', 'Adeleke Monsoor Opeyemi', 'opeyemiademon@gmail.com', '08032950881', '7468813102', '', '$2b$10$DEwUReWdaKZe/Xx1oMhieOqPCS7LDdT4FWxvEULn6MLL9QjM3geI6', 0, 0, 'Active', 'user', '2023-12-26 07:32:49', '2023-12-26 07:32:49');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_withdrawals`
--

CREATE TABLE `tbl_withdrawals` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `wallet` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `bank_code` varchar(255) NOT NULL,
  `bank_name` varchar(255) NOT NULL,
  `account_number` varchar(255) NOT NULL,
  `account_name` varchar(255) NOT NULL,
  `date_request` date DEFAULT NULL,
  `date_paid` date DEFAULT NULL,
  `branch_code` varchar(255) DEFAULT NULL,
  `process_by` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `remark` text DEFAULT NULL,
  `transaction_mode` varchar(255) NOT NULL,
  `transaction_ref` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_appointments`
--
ALTER TABLE `tbl_appointments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `app_code` (`code`),
  ADD KEY `app_user_code` (`user_code`),
  ADD KEY `app_doctor_code` (`doctor_code`);

--
-- Indexes for table `tbl_categories`
--
ALTER TABLE `tbl_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `code` (`code`);

--
-- Indexes for table `tbl_doctors`
--
ALTER TABLE `tbl_doctors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `doctor_code` (`code`),
  ADD KEY `doctor_email` (`email`);

--
-- Indexes for table `tbl_doctors_departments`
--
ALTER TABLE `tbl_doctors_departments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `code` (`code`),
  ADD KEY `department_code` (`department_code`),
  ADD KEY `doctor_code` (`doctor_code`),
  ADD KEY `hospital_code` (`hospital_code`);

--
-- Indexes for table `tbl_doctor_specialities`
--
ALTER TABLE `tbl_doctor_specialities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `code` (`code`),
  ADD KEY `title` (`title`);

--
-- Indexes for table `tbl_hospitals`
--
ALTER TABLE `tbl_hospitals`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `code` (`code`),
  ADD KEY `hospital_name` (`hospital_name`);

--
-- Indexes for table `tbl_labs`
--
ALTER TABLE `tbl_labs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `code` (`code`),
  ADD KEY `lab_name` (`lab_name`);

--
-- Indexes for table `tbl_lab_tests`
--
ALTER TABLE `tbl_lab_tests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `code` (`code`),
  ADD KEY `lab_code` (`lab_code`);

--
-- Indexes for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `order_code` (`code`),
  ADD KEY `order_wallet` (`wallet`),
  ADD KEY `order_date_order` (`date_order`),
  ADD KEY `order_user_code` (`user_code`);

--
-- Indexes for table `tbl_order_items`
--
ALTER TABLE `tbl_order_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `user_code` (`user_code`),
  ADD KEY `product_code` (`product_code`),
  ADD KEY `vendor_code` (`vendor_code`),
  ADD KEY `date_order` (`date_order`);

--
-- Indexes for table `tbl_payments`
--
ALTER TABLE `tbl_payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `pay_code` (`code`),
  ADD KEY `pay_wallet` (`wallet`),
  ADD KEY `pay_date_paid` (`date_paid`),
  ADD KEY `pay_user_code` (`user_code`);

--
-- Indexes for table `tbl_pharmacy_products`
--
ALTER TABLE `tbl_pharmacy_products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `p_code` (`code`),
  ADD KEY `p_pharmacy_code` (`pharmacy_code`),
  ADD KEY `p_product_id` (`product_id`),
  ADD KEY `p_staff_code` (`staff_code`),
  ADD KEY `p_product_name` (`product_name`),
  ADD KEY `p_category_code` (`category_code`);

--
-- Indexes for table `tbl_pharmacy_products_categories`
--
ALTER TABLE `tbl_pharmacy_products_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `code` (`code`),
  ADD KEY `pharmacy_code` (`pharmacy_code`),
  ADD KEY `parent_code` (`parent_code`),
  ADD KEY `staff_code` (`staff_code`),
  ADD KEY `category_name` (`category_name`);

--
-- Indexes for table `tbl_pharmacy_stores`
--
ALTER TABLE `tbl_pharmacy_stores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `s_code` (`code`),
  ADD KEY `s_store_name` (`store_name`);

--
-- Indexes for table `tbl_reminders`
--
ALTER TABLE `tbl_reminders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `code` (`code`),
  ADD KEY `user_code` (`user_code`);

--
-- Indexes for table `tbl_reviews`
--
ALTER TABLE `tbl_reviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `rev_code` (`code`),
  ADD KEY `rev_user_code` (`user_code`),
  ADD KEY `rev_review_type` (`review_type`);

--
-- Indexes for table `tbl_riders`
--
ALTER TABLE `tbl_riders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `rider_code` (`code`),
  ADD KEY `rider_email` (`email`);

--
-- Indexes for table `tbl_sub_categories`
--
ALTER TABLE `tbl_sub_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `code` (`code`);

--
-- Indexes for table `tbl_test_bookings`
--
ALTER TABLE `tbl_test_bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `user_code` (`user_code`),
  ADD KEY `lab_code` (`lab_code`),
  ADD KEY `test_code` (`test_code`);

--
-- Indexes for table `tbl_test_booking_summaries`
--
ALTER TABLE `tbl_test_booking_summaries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `user_code` (`user_code`),
  ADD KEY `order_code` (`order_code`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `u_code` (`code`),
  ADD KEY `u_wallet` (`wallet`),
  ADD KEY `u_fullname` (`fullname`),
  ADD KEY `u_status` (`status`),
  ADD KEY `u_email_address` (`email_address`);

--
-- Indexes for table `tbl_withdrawals`
--
ALTER TABLE `tbl_withdrawals`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `dep_code` (`code`),
  ADD KEY `dep_wallet` (`wallet`),
  ADD KEY `dep_date_paid` (`date_paid`),
  ADD KEY `dep_date_request` (`date_request`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_appointments`
--
ALTER TABLE `tbl_appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_categories`
--
ALTER TABLE `tbl_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_doctors`
--
ALTER TABLE `tbl_doctors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_doctors_departments`
--
ALTER TABLE `tbl_doctors_departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_doctor_specialities`
--
ALTER TABLE `tbl_doctor_specialities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_hospitals`
--
ALTER TABLE `tbl_hospitals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_labs`
--
ALTER TABLE `tbl_labs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_lab_tests`
--
ALTER TABLE `tbl_lab_tests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_order_items`
--
ALTER TABLE `tbl_order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_payments`
--
ALTER TABLE `tbl_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_pharmacy_products`
--
ALTER TABLE `tbl_pharmacy_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_pharmacy_products_categories`
--
ALTER TABLE `tbl_pharmacy_products_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_pharmacy_stores`
--
ALTER TABLE `tbl_pharmacy_stores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_reminders`
--
ALTER TABLE `tbl_reminders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_reviews`
--
ALTER TABLE `tbl_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_riders`
--
ALTER TABLE `tbl_riders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_sub_categories`
--
ALTER TABLE `tbl_sub_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_test_bookings`
--
ALTER TABLE `tbl_test_bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_test_booking_summaries`
--
ALTER TABLE `tbl_test_booking_summaries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_withdrawals`
--
ALTER TABLE `tbl_withdrawals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
