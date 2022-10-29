-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Creato il: Ott 28, 2022 alle 10:09
-- Versione del server: 5.7.36
-- Versione PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mutuiamo`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `bank`
--

DROP TABLE IF EXISTS `bank`;
CREATE TABLE IF NOT EXISTS `bank` (
  `id_bank` int(225) NOT NULL AUTO_INCREMENT,
  `nome_bank` varchar(200) NOT NULL,
  `codice_bank` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_bank`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `bank`
--

INSERT INTO `bank` (`id_bank`, `nome_bank`, `codice_bank`) VALUES
(1, 'Intesa Sanpaolo', '123'),
(3, 'Credit Agricole', '456'),
(4, 'BNL', '');

-- --------------------------------------------------------

--
-- Struttura della tabella `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id_product` int(225) NOT NULL AUTO_INCREMENT,
  `nome_product` varchar(200) NOT NULL,
  PRIMARY KEY (`id_product`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `product`
--

INSERT INTO `product` (`id_product`, `nome_product`) VALUES
(1, 'Tasso fisso'),
(2, 'Tasso variabile'),
(3, 'Tasso variabile con CAP'),
(4, 'Mutuo giovani tasso fisso'),
(5, 'Mutuo giovani tasso variabile');

-- --------------------------------------------------------

--
-- Struttura della tabella `prospect`
--

DROP TABLE IF EXISTS `prospect`;
CREATE TABLE IF NOT EXISTS `prospect` (
  `id_prospect` int(225) NOT NULL AUTO_INCREMENT,
  `id_product` int(225) NOT NULL,
  `id_bank` int(225) NOT NULL,
  `id_user` int(225) NOT NULL,
  `rata_prospect` varchar(200) NOT NULL,
  `tan_prospect` int(225) NOT NULL,
  `taeg_prospect` int(225) NOT NULL,
  `data_prospect` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ricezione_prospect` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_prospect`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `prospect`
--

INSERT INTO `prospect` (`id_prospect`, `id_product`, `id_bank`, `id_user`, `rata_prospect`, `tan_prospect`, `taeg_prospect`, `data_prospect`, `ricezione_prospect`) VALUES
(1, 1, 1, 1, '550,20', 2, 5, '2022-10-27 12:25:40', 0),
(2, 1, 1, 2, '345', 2, 2, '2022-10-27 12:57:58', 0),
(3, 1, 1, 1, '567', 4, 4, '2022-10-27 12:57:58', 0),
(4, 2, 2, 1, '123', 1, 1, '2022-10-27 13:32:47', 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(225) NOT NULL AUTO_INCREMENT,
  `nome_user` varchar(200) NOT NULL,
  `cognome_user` varchar(200) NOT NULL,
  `email_user` varchar(200) NOT NULL,
  `cf_user` varchar(200) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `user`
--

INSERT INTO `user` (`id_user`, `nome_user`, `cognome_user`, `email_user`, `cf_user`) VALUES
(1, 'Andrea', 'Martinelli', 'andrea.red93@gmail.com', 'MRTNDR93R12H501O');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
