from inventory_report.reports.simple_report import SimpleReport


class CompleteReport(SimpleReport):

    @classmethod
    def generate(cls, products):
        companies = {}

        for product in products:
            company = product["nome_da_empresa"]

            if company in companies:
                companies[company] += 1
            else:
                companies[company] = 1

        start_report = super().generate(products)
        end_report = "Produtos estocados por empresa:\n"

        for company in companies.items():
            end_report += f"- {company[0]}: {company[1]}\n"

        return f"{start_report}\n{end_report}"
