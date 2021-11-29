import {
  ChartKind,
  ChartTopLevelType,
  ChartType,
} from 'react-json-chart-builder';
import { REPORT_LAYOUTS } from '../../Components/ReportComponents';
import { TableHeaders, ReportSchema, SchemaFnc } from '../types';

const slug = 'automation_calculator';

const name = 'Automation calculator';

const description =
  'The calculated savings of the job templates running across the company in comparison to the cost of completing these jobs manually.\n\n' +
  'You can use this report to get an idea of the ROI from your automation, as well as identify which templates are contributing to this savings the most';

const tableHeaders = [] as TableHeaders;

const schemaFnc: SchemaFnc = () => [
  {
    id: 1,
    kind: ChartKind.wrapper,
    type: ChartTopLevelType.chart,
    parent: null,
    props: {
      height: 350,
      padding: {
        top: 10,
        bottom: 150,
        right: 0,
        left: 90,
      },
      domainPadding: {
        y: 25,
        x: 85,
      },
    },
    xAxis: {
      label: 'Templates',
      style: {
        axisLabel: {
          padding: 130,
        },
      },
      labelProps: {
        angle: -45,
        textAnchor: 'end',
        dx: 0,
        dy: 0,
      },
      fixLabelOverlap: false,
    },
    yAxis: {
      tickFormat: 'formatNumberAsK',
      showGrid: true,
      label: 'Savings per template',
      style: {
        axisLabel: {
          padding: 60,
        },
      },
    },
    api: {
      url: '',
      params: {},
    },
  },
  {
    id: 2,
    kind: ChartKind.group,
    parent: 1,
    template: {
      id: 0,
      kind: ChartKind.simple,
      type: ChartType.bar,
      parent: 0,
      props: {
        x: 'name',
        y: 'delta',
      },
      tooltip: {
        standalone: true,
        labelName: 'Saving',
      },
    },
  },
];

const reportParams: ReportSchema = {
  slug,
  tableHeaders,
  name,
  description,
  schemaFnc,
  componentName: REPORT_LAYOUTS.AUTOMATION_CALCULATOR,
};

export default reportParams;
