from datetime import datetime


class SimpleReport:
    today = datetime.now().date()

    @staticmethod
    def to_date(date):
        # https://pt.stackoverflow.com/questions/405938/converter-uma-str-em-datetime-no-python
        return datetime.strptime(date, "%Y-%m-%d").date()

    @staticmethod
    def report(fab, exp, comp):
        # https://stackoverflow.com/questions/6987285/find-the-item-with-maximum-occurrences-in-a-list
        return f"""Data de fabricação mais antiga: {min(fab)}
Data de validade mais próxima: {min(exp)}
Empresa com mais produtos: {max(comp, key=comp.count)}"""

    @classmethod
    def generate(cls, products):
        manufacture = []
        expiration = []
        companies = []

        for prod in products:
            manufacture.append(prod["data_de_fabricacao"])
            companies.append(prod["nome_da_empresa"])
            validity = cls.to_date(prod["data_de_validade"])

            if validity > cls.today:
                expiration.append(prod["data_de_validade"])

        return cls.report(manufacture, expiration, companies)
