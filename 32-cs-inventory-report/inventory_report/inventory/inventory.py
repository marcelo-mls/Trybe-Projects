# https://python-guide-pt-br.readthedocs.io/pt_BR/latest/scenarios/xml.html
import xmltodict
import json
import csv

from inventory_report.reports.simple_report import SimpleReport
from inventory_report.reports.complete_report import CompleteReport


class Inventory:
    @staticmethod
    def read_file(path):
        with open(path, mode="r", encoding="utf-8") as file:
            if ".csv" in path:
                content = csv.DictReader(file, delimiter=",", quotechar='"')
                products = [row for row in content]

            if ".json" in path:
                products = json.load(file)

            if ".xml" in path:
                content = xmltodict.parse(file.read())
                products = content["dataset"]["record"]

        return products

    @classmethod
    def import_data(cls, path, type):

        products = cls.read_file(path)

        if type == "simples":
            return SimpleReport.generate(products)
        if type == "completo":
            return CompleteReport.generate(products)
