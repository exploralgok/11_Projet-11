<?php
/**
 * La configuration de base de votre installation WordPress.
 *
 * Ce fichier contient les réglages de configuration suivants : réglages MySQL,
 * préfixe de table, clés secrètes, langue utilisée, et ABSPATH.
 * Vous pouvez en savoir plus à leur sujet en allant sur
 * {@link https://fr.wordpress.org/support/article/editing-wp-config-php/ Modifier
 * wp-config.php}. C’est votre hébergeur qui doit vous donner vos
 * codes MySQL.
 *
 * Ce fichier est utilisé par le script de création de wp-config.php pendant
 * le processus d’installation. Vous n’avez pas à utiliser le site web, vous
 * pouvez simplement renommer ce fichier en "wp-config.php" et remplir les
 * valeurs.
 *
 * @link https://fr.wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Réglages MySQL - Votre hébergeur doit vous fournir ces informations. ** //
/** Nom de la base de données de WordPress. */
define( 'DB_NAME', 'p11' );

/** Utilisateur de la base de données MySQL. */
define( 'DB_USER', 'root' );

/** Mot de passe de la base de données MySQL. */
define( 'DB_PASSWORD', 'root' );

/** Adresse de l’hébergement MySQL. */
define( 'DB_HOST', 'localhost' );

/** Jeu de caractères à utiliser par la base de données lors de la création des tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** Type de collation de la base de données.
  * N’y touchez que si vous savez ce que vous faites.
  */
define('DB_COLLATE', '');

/**#@+
 * Clés uniques d’authentification et salage.
 *
 * Remplacez les valeurs par défaut par des phrases uniques !
 * Vous pouvez générer des phrases aléatoires en utilisant
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ le service de clés secrètes de WordPress.org}.
 * Vous pouvez modifier ces phrases à n’importe quel moment, afin d’invalider tous les cookies existants.
 * Cela forcera également tous les utilisateurs à se reconnecter.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '4>;m<(s|em-!@w5C8%6:n:*,(0AvCX}[7r[?ImlQ7n`ZfSEH0U`vt6+>Icd8$>xP' );
define( 'SECURE_AUTH_KEY',  '{)AaHjt}ilXk.@H}7j-0b^^q1>J+X*^})$$l~-6Q%)Nf&J8K,DxI~X?65~[qD rB' );
define( 'LOGGED_IN_KEY',    'V`N$4yI!~_etmrWl466Jg2f#K%JKxwG_-)e;,~H&t}0O,2=D#Tf,Td~[%jPb%=As' );
define( 'NONCE_KEY',        '7Ej1H).%9bni=c&+6X3@2@pRF}!Se4n*DUjD+K,E)K9~TV#uq|J>N~xEe8429hRX' );
define( 'AUTH_SALT',        'idu+_%)p~j=T7DdZ=#H|Y0|.MMuiDvH;(#eycJM`+Ba@/^7]EGYk.q{GsGK1JZpv' );
define( 'SECURE_AUTH_SALT', 'Tc!Z,wy]{>EK}$UL6Kz+@*1 @bk(MS,f8pj.GDFruyY<TV-p/3y+),c6vpINBPf<' );
define( 'LOGGED_IN_SALT',   'Q^BqVfQ_1,]1dRO;9v|07N<~;G1465tZS>HGsmn>N)=I3z!3)}nG=_$aa]#M|V#B' );
define( 'NONCE_SALT',       'e2pN5Q0tLhA;XtbR(Ac]o=dAR:[3C_E$XpT[=|.BvrnS.ymX^=/)]giE-_P9v=P|' );
/**#@-*/

/**
 * Préfixe de base de données pour les tables de WordPress.
 *
 * Vous pouvez installer plusieurs WordPress sur une seule base de données
 * si vous leur donnez chacune un préfixe unique.
 * N’utilisez que des chiffres, des lettres non-accentuées, et des caractères soulignés !
 */
$table_prefix = 'wp_';

/**
 * Pour les développeurs et développeuses : le mode déboguage de WordPress.
 *
 * En passant la valeur suivante à "true", vous activez l’affichage des
 * notifications d’erreurs pendant vos essais.
 * Il est fortement recommandé que les développeurs et développeuses d’extensions et
 * de thèmes se servent de WP_DEBUG dans leur environnement de
 * développement.
 *
 * Pour plus d’information sur les autres constantes qui peuvent être utilisées
 * pour le déboguage, rendez-vous sur la documentation.
 *
 * @link https://fr.wordpress.org/support/article/debugging-in-wordpress/
 */
define('WP_DEBUG', false);

/* C’est tout, ne touchez pas à ce qui suit ! Bonne publication. */

/** Chemin absolu vers le dossier de WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once(ABSPATH . 'wp-settings.php');
