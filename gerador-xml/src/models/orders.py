from database import connection


def search_orders_generated():
    query = 'SELECT * FROM orders o WHERE o.xml_generated IS NOT TRUE'
    cursor = connection.cursor()
    cursor.execute(query)
    result = cursor.fetchall()
    return [dict(row) for row in result]


def update_xml_generated_info(order_id: str, status: bool):
    sql = 'UPDATE orders SET xml_generated = %s WHERE id = %s'
    cursor = connection.cursor()
    cursor.execute(sql, (status, order_id))
