import os

import xmltodict

from src.models import orders

XML_OUTPUT_FOLDER = './xml'

def _get_final_path():
     return os.path.join(os.getcwd(), XML_OUTPUT_FOLDER)


def _create_export_dir():
    final_path = _get_final_path()
    print('Verificando se o caminho de saída existe')
    print(final_path)

    os.makedirs(final_path, exist_ok=True)


def _write_xml_to_file(cnpj: str, order_id: str, xml_content: str):
    file_name = os.path.join(_get_final_path(), f'{cnpj}-{order_id}.xml')
    print('Construindo o arquivo XML...')

    with open(file_name, 'w') as xml_file:
        xml_file.write(xml_content)

    print(f'XML gerado: {file_name}')


def _persist_xml_generated_info_in_db(order_id: str):
    print(f'Atualizando o pedido {order_id} com o status XML gerado verdadeiro')
    orders.update_xml_generated_info(order_id, True)
    print('XML gerado e persistido')


def _generate_xml(orders_list: list):
    if not orders_list:
        print('Nenhum pedido para gerar XML.')
        return

    print('Iniciando geração de XML para os pedidos...')
    _create_export_dir()
    for order in orders_list:
        print('--------------------------------------------------')
        order_id, cnpj = order['id'], order['cnpj']
        print(f'=== Gerando XML para o pedido {order_id}')
        xml_dict = dict(pedido=order) # adiciona o nome pedido como root do xml
        xml_string = xmltodict.unparse(xml_dict)
        _write_xml_to_file(cnpj, order_id, xml_string)
        _persist_xml_generated_info_in_db(order_id)


def generate_xml_to_orders():
    print('Iniciando geração de XML para pedidos os pedidos sem o XML...')
    print('--- Procurando pedidos sem XML gerado...')

    orders_list = orders.search_orders_generated()

    print(f'Total de pedidos encontrados sem XML: {len(orders_list)}')

    _generate_xml(orders_list)

    print('Processamento finalizado!')
