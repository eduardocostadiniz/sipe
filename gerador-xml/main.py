from src.modules import xml_generator


def run():
    print('******************** SIPE - GERADOR XML DOS PEDIDOS ********************')

    xml_generator.generate_xml_to_orders()


run()