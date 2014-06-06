

/**
 * Emulation of the MC DatabaseConnection object.
 * @author Hizni Salih
 * @global {mcDatabaseConnection} Emulation of the MC DatabaseConnection object. An instance of mcDatabaseConnection
 * @see mcEm.js
 */
var DatabaseConnection = new mcDatabaseConnection();

/**
 * @description Constructs a mcDatabaseConnection Object that resembles 'DatabaseConnection' class in Mirth Connect
 * @constructor
 */
function mcDatabaseConnection() {
	this.connection = null;
	
	/**
	 * @description sets up a database connection (java.sql.Connection) if does not already exist
	 */
	this.getConnection = function(){
		if (this.connection == null){
			if (arguments.length == 4){
				var driver = arguments[0];
				var address = arguments[1];
				var username = arguments[2];
				var password = arguments[3];
				
				Packages.java.lang.Class.forName(driver);
				this.connection = new Packages.java.sql.DriverManager.getConnection(address, username, password);
			}
			
			if (arguments.length == 2){
				var driver = arguments[0];
				var address = arguments[1];
				
				Packages.java.lang.Class.forName(driver);
				this.connection = new Packages.java.sql.DriverManager.getConnection(address);
			}
		}
	};

	/**
	 * @description executes a cached query.
	 * @param SQL query or prepared statement to be executed
	 * @param {Object=} parameters The parameters for the stored procedure. (optional unless calling stored procedure)
	 * @return The result of the query, as a CachedRowSet.
	 */
	this.executeCachedQuery = function() {
		
		//test if only one argument has been passed
		if (arguments.length == 1){
		var expression = arguments[0];
		var statement = "";
		try {			   
	           statement = this.connection.createStatement();
	           //logger.info("executeCachedQuery() - Executing query: " + expression);
	           var result = statement.executeQuery(expression);
	           var crs = new Packages.com.sun.rowset.CachedRowSetImpl();
	           crs.populate(result);
	           Packages.org.apache.commons.dbutils.DbUtils.closeQuietly(result);
	           
	           return crs;
	    } catch (e) {
	         throw e;
	    } finally {
	    	Packages.org.apache.commons.dbutils.DbUtils.closeQuietly(statement);
	    };
		}
		
		//test if two arguments have been passed
		if (arguments.length == 2){
			var expression = arguments[0];
			var parameters = arguments[1];
			
			var statement = "";
			try{
				statement = this.connection.prepareStatement(expression);
		        logger.debug("executing prepared statement:\n" + expression);
		 
		        //ListIterator<Object> iterator = parameters.listIterator();
		        var iterator = parameters.listIterator();
		        while (iterator.hasNext()) {
		        	var index = iterator.nextIndex() + 1;
		            var value = iterator.next();
		            logger.debug("adding parameter: index=" + index + ", value=" + value);
		            statement.setObject(index, value);
		        }
		        
		        var result = statement.executeQuery();
		        var crs = new Packages.com.sun.rowset.CachedRowSetImpl();
		        crs.populate(result);
		        Packages.org.apache.commons.dbutils.DbUtils.closeQuietly(result);
		           
		        return crs;
			} catch (e) {
		         throw e;
		    } finally {
		    	Packages.org.apache.commons.dbutils.DbUtils.closeQuietly(statement);
		    };
		};
	};
	
	/**
	 * @description executes an insert/update on the database and returns the row count.
	 * @param SQL query or prepared statement to be executed
	 * @param {Object=} parameters The parameters for the stored procedure. (optional unless calling stored procedure)
	 * @return A count of the number of updated rows.
	 */
	this.executeUpdate = function(){
		if (arguments.length == 1) {
			var expression = arguments[0];
			var statement = "";
			try {
				statement = this.connection.createStatement();
				logger.debug("executing update: " + expression);

				if (statement.execute(expression)) {
					return -1;
				} else {
					return statement.getUpdateCount();
				}
			} catch (e) {
				throw e;
			} finally {
				Packages.org.apache.commons.dbutils.DbUtils.closeQuietly(statement);
			}
		};
		
		if (arguments.length == 2){
			var expression = arguments[0];
			var parameters = arguments[1];

			var statement = "";
			try{
				statement = this.connection.prepareStatement(expression);
				logger.debug("executing prepared statement:\n" + expression);

				//ListIterator<Object> iterator = parameters.listIterator();
				var iterator = parameters.listIterator();
				while (iterator.hasNext()) {
					var index = iterator.nextIndex() + 1;
					var value = iterator.next();
					logger.debug("adding parameter: index=" + index + ", value=" + value);
					statement.setObject(index, value);
				}

				if (statement.execute()) {
					return -1;
				} else {
					return statement.getUpdateCount();
				};
			} catch (e) {
				throw e;
			} finally {
				Packages.org.apache.commons.dbutils.DbUtils.closeQuietly(statement);
			};
		};
	};
	
	/**
	 * @description closes the database connection
	 */
	this.close = function(){
		try {
			Packages.org.apache.commons.dbutils.DbUtils.close(this.connection);
		} catch (e) {
			logger.warn(e);
		};
	};

	/**
	 * @description sets this connection's auto-commit mode to the given state.
     * @param autoCommit The value (true or false) to set the connection's auto-commit mode to.
	 */
	this.setAutoCommit = function(autoCommit) {
		this.connection.setAutoCommit(autoCommit);
	};

	/**
	 * @description undoes all changes made in the current transaction and releases any database locks currently held by this Connection object.
	 */
	this.rollback = function() {
		this.connection.rollback();
	};
	
	/**
	 * @description  applies all made since the previous commit/rollback permanent and releases any database
     * locks currently held by this DatabaseConnection object.
	 */
	this.commit = function(){
		this.connection.commit();
	};
	
	/**
	 * @description Executes an INSERT/UPDATE statement or stored procedure on the database and returns a CachedRowSet containing any
     * generated keys.
     * @param SQL query or stored procedure to be executed.
	 * @param {Object=} parameters The parameters for the stored procedure. (optional unless calling stored procedure)
	 * @return A CachedRowSet containing any generated keys.
	 */
	this.executeUpdateAndGetGeneratedKeys = function(){
		if (arguments.length == 1) {
			var expression = arguments[0];
			var statement = "";
			try {
				statement = connection.createStatement();
				logger.debug("executing update: " + expression);
				statement.executeUpdate(expression, Packages.java.sql.Statement.RETURN_GENERATED_KEYS);
				var crs = new Packages.com.sun.rowset.CachedRowSetImpl();
				crs.populate(result);
				return crs;
			} catch (e) {
				throw e;
			} finally {
				Packages.org.apache.commons.dbutils.DbUtils.closeQuietly(statement);
			}
			;
		}
		
		if (arguments.length == 2) {
			var expression = arguments[0];
			var parameters = arguments[1];
			var statement = "";

			try {
				statement = connection.prepareStatement(expression, Packages.java.sql.Statement.RETURN_GENERATED_KEYS);
				logger.debug("executing prepared statement:\n" + expression);

				var iterator = parameters.listIterator();

				while (iterator.hasNext()) {
					var index = iterator.nextIndex() + 1;
					var value = iterator.next();
					logger.debug("adding parameter: index=" + index + ", value=" + value);
					statement.setObject(index, value);
				}

				statement.executeUpdate();
				var crs = new CachedRowSetImpl();
				crs.populate(statement.getGeneratedKeys());
				return crs;
			} catch (e) {
				throw e;
			} finally {
				Packages.org.apache.commons.dbutils.DbUtils.closeQuietly(statement);
			};
		};
	};
};

/**
 * Emulation of the MC DatabaseConnectionFactory object. An instance of mcDatabaseConnectionFactory
 * @author Hizni Salih
 * @global {mcDatabaseConnectionFactory} Emulation of the MC DatabaseConnectionFactory object instantiates an instance of mcDatabaseConnectionFactory
 */
var DatabaseConnectionFactory = new mcDatabaseConnectionFactory();

/**
 * @description Constructs a mcDatabaseConnectionFactory Object that resembles 'DatabaseConnectionFactory'
 * @constructor
 */
function mcDatabaseConnectionFactory () {
		/**
		 * Instantiates and returns a new DatabaseConnection object with the given connection
		 * parameters.
		 * @param {String=} driver The JDBC driver class to be used to create the connection with.
		 * @param address The server address to connect to.
		 * @param {String=} username The username to connect with. (optional)
		 * @param {String=} password The password to connect with. (optional)
		 * @returns the created DatabaseConnection object.
		 */
		this.createDatabaseConnection = function(){
			
 			if (arguments.length == 4) {
	    
				var mcdbc = new mcDatabaseConnection();
				var driver = arguments[0];
				var address = arguments[1];
				var username = arguments[2];
				var password = arguments[3];
				mcdbc.getConnection(driver, address, username, password);
				return mcdbc;
			};
			
			if (arguments.length == 2){
				
				var mcdbc = new mcDatabaseConnection();
				var driver = arguments[0];
				var address = arguments[1];
				mcdbc.getConnection(driver, address);
				return mcdbc;
			};			
		};
};




