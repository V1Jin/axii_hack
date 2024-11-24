const mockData = [
    {
        title: "Финансирование",
        content: "В 2024 году предприниматели могут получить различные виды господдержки, включая финансовую помощь в виде грантов и субсидий. Субсидии предоставляются на конкретные цели и могут включать налоговые льготы и сертификаты госпомощи. Социальный контракт позволяет малообеспеченным гражданам получить до 350 тыс. рублей на открытие бизнеса. Также доступны субсидии на возмещение процентов по кредитам и на трудоустройство.В условиях санкций государственная поддержка становится важным инструментом для малого и среднего бизнеса. Предприниматели могут получить льготные кредиты, которые помогут сделать кредиты более доступными."
    },
    {
        title: "Маркетинг",
        content: "В 2024 году предприниматели могут получить различные виды господдержки, включая финансовую помощь в виде грантов и субсидий. Субсидии предоставляются на конкретные цели и могут включать налоговые льготы и сертификаты госпомощи. Социальный контракт позволяет малообеспеченным гражданам получить до 350 тыс. рублей на открытие бизнеса. Также доступны субсидии на возмещение процентов по кредитам и на трудоустройство.В условиях санкций государственная поддержка становится важным инструментом для малого и среднего бизнеса. Предприниматели могут получить льготные кредиты, которые помогут сделать кредиты более доступными."
    },
    {
        title: "Недвижимость",
        content: "В 2024 году предприниматели могут получить различные виды господдержки, включая финансовую помощь в виде грантов и субсидий. Субсидии предоставляются на конкретные цели и могут включать налоговые льготы и сертификаты госпомощи. Социальный контракт позволяет малообеспеченным гражданам получить до 350 тыс. рублей на открытие бизнеса. Также доступны субсидии на возмещение процентов по кредитам и на трудоустройство.В условиях санкций государственная поддержка становится важным инструментом для малого и среднего бизнеса. Предприниматели могут получить льготные кредиты, которые помогут сделать кредиты более доступными."
    },
    {
        title: "Консультирование",
        content: "В 2024 году предприниматели могут получить различные виды господдержки, включая финансовую помощь в виде грантов и субсидий. Субсидии предоставляются на конкретные цели и могут включать налоговые льготы и сертификаты госпомощи. Социальный контракт позволяет малообеспеченным гражданам получить до 350 тыс. рублей на открытие бизнеса. Также доступны субсидии на возмещение процентов по кредитам и на трудоустройство.В условиях санкций государственная поддержка становится важным инструментом для малого и среднего бизнеса. Предприниматели могут получить льготные кредиты, которые помогут сделать кредиты более доступными."
    },
    {
        title: "Поддержка экспорта",
        content: "В 2024 году предприниматели могут получить различные виды господдержки, включая финансовую помощь в виде грантов и субсидий. Субсидии предоставляются на конкретные цели и могут включать налоговые льготы и сертификаты госпомощи. Социальный контракт позволяет малообеспеченным гражданам получить до 350 тыс. рублей на открытие бизнеса. Также доступны субсидии на возмещение процентов по кредитам и на трудоустройство.В условиях санкций государственная поддержка становится важным инструментом для малого и среднего бизнеса. Предприниматели могут получить льготные кредиты, которые помогут сделать кредиты более доступными."
    },
    {
        title: "Регистрация, разрешения, экспертиза",
        content: "В 2024 году предприниматели могут получить различные виды господдержки, включая финансовую помощь в виде грантов и субсидий. Субсидии предоставляются на конкретные цели и могут включать налоговые льготы и сертификаты госпомощи. Социальный контракт позволяет малообеспеченным гражданам получить до 350 тыс. рублей на открытие бизнеса. Также доступны субсидии на возмещение процентов по кредитам и на трудоустройство.В условиях санкций государственная поддержка становится важным инструментом для малого и среднего бизнеса. Предприниматели могут получить льготные кредиты, которые помогут сделать кредиты более доступными."
    },
    {
        title: "Обеспечение хозяйственной деятельности",
        content: "В 2024 году предприниматели могут получить различные виды господдержки, включая финансовую помощь в виде грантов и субсидий. Субсидии предоставляются на конкретные цели и могут включать налоговые льготы и сертификаты госпомощи. Социальный контракт позволяет малообеспеченным гражданам получить до 350 тыс. рублей на открытие бизнеса. Также доступны субсидии на возмещение процентов по кредитам и на трудоустройство.В условиях санкций государственная поддержка становится важным инструментом для малого и среднего бизнеса. Предприниматели могут получить льготные кредиты, которые помогут сделать кредиты более доступными."
    },
    {
        title: "Выставки и ярмарки",
        content: "В 2024 году предприниматели могут получить различные виды господдержки, включая финансовую помощь в виде грантов и субсидий. Субсидии предоставляются на конкретные цели и могут включать налоговые льготы и сертификаты госпомощи. Социальный контракт позволяет малообеспеченным гражданам получить до 350 тыс. рублей на открытие бизнеса. Также доступны субсидии на возмещение процентов по кредитам и на трудоустройство.В условиях санкций государственная поддержка становится важным инструментом для малого и среднего бизнеса. Предприниматели могут получить льготные кредиты, которые помогут сделать кредиты более доступными."
    }
];