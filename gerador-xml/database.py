import os
import psycopg2
import psycopg2.extras

connection_config = {
    'dbname': os.environ['SIPE_POSTGRES_DB_NAME'],
    'user': os.environ['SIPE_POSTGRES_DB_USER'],
    'password': os.environ['SIPE_POSTGRES_DB_PWRD'],
    'host': os.environ['SIPE_POSTGRES_DB_HOST'],
    'port': os.environ['SIPE_POSTGRES_DB_PORT'],
}

connection = psycopg2.connect(**connection_config, cursor_factory=psycopg2.extras.RealDictCursor)
connection.autocommit = True
