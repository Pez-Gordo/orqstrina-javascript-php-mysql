
USE `orqstrina`;

-- Dumping structure for table companydirectory.department
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nick` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- Dumping structure for table companydirectory.location
CREATE TABLE IF NOT EXISTS `full_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ftitle` varchar(50) DEFAULT NULL,
  `queued` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;



-- Dumping structure for table companydirectory.personnel
CREATE TABLE IF NOT EXISTS `queue_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `qtitle` varchar(50) DEFAULT NULL,
  `full_list_id` int(11) DEFAULT NULL,
  `played` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

