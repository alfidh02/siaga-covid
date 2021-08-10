import ApexCharts from 'apexcharts';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import covidApi from '../data/covid-api.js';

const main = () => {
  let covidData;
  let countries_list;
  let recover_rate_chart;
  let case_province_chart;
  let update_time;

  const COLORS = {
    confirmed: '#ff0000',
    recovered: '#008000',
    deaths: '#373c43',
  };

  window.onload = async () => {
    initProvinceFilter();

    await provinceData();

    await initRecoveryRate();

    await loadData('Nasional');

    await loadProvinceSelectList();

    document.querySelector('#province-select-toggle').onclick = () => {
      document.querySelector('#province-select-list').classList.toggle('active');
    };
  };

  const provinceData = async () => {
    try {
      am4core.useTheme(am4themes_animated);

      case_province_chart = am4core.create('data-provinsi', am4charts.XYChart);
      case_province_chart.responsive.enabled = true;
      case_province_chart.topAxesContainer.paddingTop = 30;

      case_province_chart.dataSource.url = 'https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi';
      case_province_chart.legend = new am4charts.Legend();
      case_province_chart.legend.position = 'top';
      case_province_chart.legend.fontSize = 12;

      const markerTemplate = case_province_chart.legend.markers.template;
      markerTemplate.width = 15;
      markerTemplate.height = 15;
      case_province_chart.legend.labels.template.textDecoration = 'none';
      case_province_chart.legend.valueLabels.template.textDecoration = 'none';

      const as = case_province_chart.legend.labels.template.states.getKey('active');
      as.properties.textDecoration = 'line-through';

      const categoryAxis = case_province_chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'provinsi';
      categoryAxis.renderer.labels.template.horizontalCenter = 'right';
      categoryAxis.renderer.labels.template.verticalCenter = 'middle';
      categoryAxis.renderer.labels.template.rotation = -90;
      categoryAxis.renderer.grid.template.strokeOpacity = 0;
      categoryAxis.renderer.minGridDistance = 25;
      categoryAxis.fontSize = 10;
      categoryAxis.showOnInit = false;

      const categoryAxis2 = case_province_chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis2.renderer.opposite = true;
      categoryAxis2.dataFields.category = 'provinsi';
      categoryAxis2.renderer.grid.template.disabled = true;
      categoryAxis2.renderer.labels.template.disabled = true;

      const axisTooltip = categoryAxis2.tooltip;
      axisTooltip.background.fill = am4core.color('rgb(226, 63, 65)');
      axisTooltip.background.strokeWidth = 0;
      axisTooltip.background.cornerRadius = 3;

      categoryAxis2.adapter.add('getTooltipText', (text) => {
        let totalValue = 0;
        case_province_chart.series.each((series) => {
          totalValue += series.tooltipDataItem.valueY;
        });
        return `Total Terkonfirmasi: ${case_province_chart.numberFormatter.format(totalValue)}`;
      });

      const valueAxis = case_province_chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = 'Jumlah Kasus';
      valueAxis.fontSize = 10;
      valueAxis.title.fontSize = 15;

      const series = case_province_chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = 'meninggal';
      series.dataFields.categoryX = 'provinsi';
      series.name = 'Meninggal';
      series.tooltipText = '{name}: [bold]{valueY}[/]';
      series.tooltip.pointerOrientation = 'vertical';
      series.tooltip.background.cornerRadius = 3;
      series.tooltip.label.padding(6, 6, 6, 6);
      series.strokeWidth = 0;
      series.fill = am4core.color('rgb(55, 60, 67)');
      series.stacked = true;

      const series2 = case_province_chart.series.push(new am4charts.ColumnSeries());
      series2.dataFields.valueY = 'dirawat';
      series2.dataFields.categoryX = 'provinsi';
      series2.name = 'Kasus Aktif';
      series2.tooltipText = '{name}: [bold]{valueY}[/]';
      series2.tooltip.pointerOrientation = 'vertical';
      series2.tooltip.background.cornerRadius = 3;
      series2.tooltip.label.padding(6, 6, 6, 6);
      series2.strokeWidth = 0;
      series2.fill = am4core.color('rgb(252, 212, 132)');
      series2.stacked = true;

      const series3 = case_province_chart.series.push(new am4charts.ColumnSeries());
      series3.dataFields.valueY = 'sembuh';
      series3.dataFields.categoryX = 'provinsi';
      series3.name = 'Sembuh';
      series3.tooltipText = '{name}: [bold]{valueY}[/]';
      series3.tooltip.pointerOrientation = 'vertical';
      series3.tooltip.background.cornerRadius = 3;
      series3.tooltip.label.padding(6, 6, 6, 6);
      series3.strokeWidth = 0;
      series3.fill = am4core.color('rgb(0, 128, 0)');
      series3.stacked = true;

      case_province_chart.scrollbarX = new am4charts.XYChartScrollbar();
      case_province_chart.scrollbarX.series.push(series3);
      case_province_chart.scrollbarX.parent = case_province_chart.bottomAxesContainer;

      const scrollAxis = case_province_chart.scrollbarX.scrollbarChart.xAxes.getIndex(0);
      scrollAxis.renderer.labels.template.disabled = true;
      scrollAxis.renderer.grid.template.disabled = false;

      case_province_chart.responsive.rules.push({
        relevant(target) {
          if (target.pixelWidth <= 400) {
            case_province_chart.legend.fontSize = 10;
            markerTemplate.width = 13;
            markerTemplate.height = 13;

            categoryAxis.renderer.minGridDistance = 5;
            categoryAxis.renderer.labels.template.rotation = -89.5;
            categoryAxis.fontSize = 7;

            valueAxis.fontSize = 8;
            valueAxis.title.fontSize = 10;

            return true;
          }

          return false;
        },
        state(target, stateId) {
          if (target instanceof am4charts.Chart) {
            const state = target.states.create(stateId);
            state.properties.paddingTop = 0;
            state.properties.paddingRight = 17;
            state.properties.paddingBottom = 0;
            state.properties.paddingLeft = 0;

            return state;
          }

          return null;
        },
      });

      case_province_chart.cursor = new am4charts.XYCursor();
    } catch (error) {
      console.log(error);
    }
  };

  const loadData = async (province) => {
    await loadSummary(province);
  };

  const isNasional = (province) => province === 'Nasional';

  const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const showConfirmedTotal = (total) => {
    document.querySelector('#confirmed-total').textContent = numberWithCommas(total);
  };

  const showRecoveredTotal = (total) => {
    document.querySelector('#recovered-total').textContent = numberWithCommas(total);
  };

  const showDeathsTotal = (total) => {
    document.querySelector('#death-total').textContent = numberWithCommas(total);
  };

  const loadSummary = (province) => {
    const provinceRank = covidApi.getProvinceCases();
    const last_update = document.querySelector('#updated-time');

    if (isNasional(province)) {
      covidData = covidApi.getSummary();
    } else {
      covidData = covidApi.getProvinceCases()
        .then((provinceData) => provinceData.filter((e) => e.provinsi.toLowerCase() === province.toLowerCase())[0]);
    }

    covidData.then((summaryData) => {
      isNasional(province) ? showConfirmedTotal(summaryData.positif) : showConfirmedTotal(summaryData.kasus);
      showRecoveredTotal(summaryData.sembuh);
      showDeathsTotal(summaryData.meninggal);
      loadRecoveryRate(Math.floor(summaryData.sembuh / (isNasional(province) ? summaryData.positif : summaryData.kasus) * 100));
      return summaryData.lastUpdate;
    })
      .then((timeUpdated) => {
        timeUpdated ? update_time = new Date(timeUpdated) : update_time;
        last_update.textContent = `Terakhir diupdate : ${update_time.toLocaleString()}`;
      });

    provinceRank.then((dataProvince) => {
      const caseInfo = dataProvince.sort((a, b) => b.kasus - a.kasus);
      const table_countries_body = document.querySelector('#table-countries tbody');
      table_countries_body.innerHTML = '';

      for (let i = 0; i < 12; i++) {
        const row = `
              <tr>
                  <td>${i + 1}</td>
                  <td>${caseInfo[i].provinsi}</td>
                  <td>${numberWithCommas(caseInfo[i].kasus)}</td>
                  <td>${numberWithCommas(caseInfo[i].sembuh)}</td>
                  <td>${numberWithCommas(caseInfo[i].meninggal)}</td>
              </tr>
          `;
        table_countries_body.innerHTML += row;
      }
    });
  };

  const initRecoveryRate = async () => {
    const options = {
      chart: {
        type: 'radialBar',
        height: '350',
      },
      series: [],
      labels: ['Recovery rate'],
      colors: [COLORS.recovered],
    };

    recover_rate_chart = new ApexCharts(document.querySelector('#recover-rate-chart'), options);

    recover_rate_chart.render();
  };

  const loadRecoveryRate = async (rate) => {
    recover_rate_chart.updateSeries([rate]);
  };

  const renderProvinceSelectList = (list) => {
    const province_select_list = document.querySelector('#province-select-list');
    province_select_list.querySelectorAll('div').forEach((e) => e.remove());
    list.forEach((e) => {
      const item = document.createElement('div');
      item.classList.add('province-item');
      item.textContent = e.provinsi;

      item.onclick = async () => {
        document.querySelector('#province-select span').textContent = e.provinsi;
        province_select_list.classList.toggle('active');
        await loadData(e.provinsi);
      };

      province_select_list.appendChild(item);
    });
  };

  const loadProvinceSelectList = async () => {
    const provinceSummary = await covidApi.getProvinceCases();

    countries_list = provinceSummary;

    const province_select_list = document.querySelector('#province-select-list');

    const item = document.createElement('div');
    item.classList.add('province-item');
    item.textContent = 'Nasional';
    item.onclick = async () => {
      document.querySelector('#province-select span').textContent = 'Nasional';
      province_select_list.classList.toggle('active');
      await loadData('Nasional');
    };
    province_select_list.appendChild(item);

    renderProvinceSelectList(countries_list);
  };

  const initProvinceFilter = () => {
    const input = document.querySelector('#province-select-list input');
    input.onkeyup = () => {
      const filtered = countries_list.filter((e) => e.provinsi.toLowerCase().includes(input.value));
      renderProvinceSelectList(filtered);
    };
  };
};

export default main;
