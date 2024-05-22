function getShortFormatedDate(date: Date) {
    const date_ = date;
    const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const diaDaSemanaAbreviado = diasDaSemana[date_.getDay()];
    const diaDoMesFormatado = ('0' + date_.getDate()).slice(-2);
    return `${diaDaSemanaAbreviado} . ${diaDoMesFormatado}`;
}

function getDateOnly(data: Date) {
    const dia = ('0' + data.getDate()).slice(-2);
    const mes = ('0' + (data.getMonth() + 1)).slice(-2); // Adiciona 1 porque os meses são baseados em zero
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
}

function getYesterdayDate() {
    const currentDate = new Date();
    const yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(currentDate.getDate() - 1);

    return yesterdayDate;
}


export { getShortFormatedDate, getDateOnly, getYesterdayDate }