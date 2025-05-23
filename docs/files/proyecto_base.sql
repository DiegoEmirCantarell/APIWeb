-- MySQL Script generated by MySQL Workbench
-- Sun May 18 07:47:33 2025
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ProyectoBase
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ProyectoBase` ;

-- -----------------------------------------------------
-- Schema ProyectoBase
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ProyectoBase` DEFAULT CHARACTER SET utf8 ;
USE `ProyectoBase` ;

-- -----------------------------------------------------
-- Table `ProyectoBase`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProyectoBase`.`user` ;

CREATE TABLE IF NOT EXISTS `ProyectoBase`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('buyer', 'seller', 'admin') NOT NULL DEFAULT 'buyer',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProyectoBase`.`category_product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProyectoBase`.`category_product` ;

CREATE TABLE IF NOT EXISTS `ProyectoBase`.`category_product` (
  `id` INT NOT NULL,
  `category` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProyectoBase`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProyectoBase`.`product` ;

CREATE TABLE IF NOT EXISTS `ProyectoBase`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `category_product_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  `price` DECIMAL NOT NULL,
  `stock` INT NULL,
  `image_url` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_product_user_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_product_category_product1_idx` (`category_product_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `ProyectoBase`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_category_product1`
    FOREIGN KEY (`category_product_id`)
    REFERENCES `ProyectoBase`.`category_product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `ProyectoBase`.`user`
-- -----------------------------------------------------
START TRANSACTION;
USE `ProyectoBase`;
INSERT INTO `ProyectoBase`.`user` (`id`, `name`, `email`, `password`, `role`) VALUES (, '', '', '', '');

COMMIT;


-- -----------------------------------------------------
-- Data for table `ProyectoBase`.`category_product`
-- -----------------------------------------------------
START TRANSACTION;
USE `ProyectoBase`;
INSERT INTO `ProyectoBase`.`category_product` (`id`, `category`) VALUES (1, 'Electrónica');
INSERT INTO `ProyectoBase`.`category_product` (`id`, `category`) VALUES (2, 'Ropa');
INSERT INTO `ProyectoBase`.`category_product` (`id`, `category`) VALUES (3, 'Hogar');
INSERT INTO `ProyectoBase`.`category_product` (`id`, `category`) VALUES (4, 'Herramientas');
INSERT INTO `ProyectoBase`.`category_product` (`id`, `category`) VALUES (5, 'Libros');
INSERT INTO `ProyectoBase`.`category_product` (`id`, `category`) VALUES (6, 'Juguetes');
INSERT INTO `ProyectoBase`.`category_product` (`id`, `category`) VALUES (7, 'Mascotas');
INSERT INTO `ProyectoBase`.`category_product` (`id`, `category`) VALUES (8, 'Belleza y salud');
INSERT INTO `ProyectoBase`.`category_product` (`id`, `category`) VALUES (, NULL);

COMMIT;

