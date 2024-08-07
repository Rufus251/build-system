import loader from "./UI/loader.vue";
import modal from "./UI/modal.vue";
import textField from "./UI/input/text-field.vue";
import fileInput from "./UI/input/file-input.vue";
import autocompleteField from "./UI/input/autocomplete-field.vue";
import textareaField from "./UI/input/textarea-field.vue";
import primaryButton400 from "./UI/button/button-width-400/primary-button.vue";
import deleteCrossButton from "./UI/button/delete-cross-button.vue";
import changePencilButton from "./UI/button/change-pencil-button.vue";
import agreeButton400 from "./UI/button/button-width-400/agree-button.vue";
import deleteButton400 from "./UI/button/button-width-400/delete-button.vue";
import changeButton400 from "./UI/button/button-width-400/change-button.vue";
import primaryRouterButton400 from "./UI/button/button-width-400/primary-router-button.vue";
import primaryButton200 from "./UI/button/button-width-200/primary-button.vue";
import agreeButton200 from "./UI/button/button-width-200/agree-button.vue";
import deleteButton200 from "./UI/button/button-width-200/delete-button.vue";
import changeButton200 from "./UI/button/button-width-200/change-button.vue";
import primaryRouterButton200 from "./UI/button/button-width-200/primary-router-button.vue";
import deleteRouterButton200 from "./UI/button/button-width-200/delete-router-button.vue";
import mainWorksTable from "./UI/table/main-works-table.vue";
import additionalWorksTable from "./UI/table/additional-works-table.vue";
import createReportTable from "./UI/table/create-report-table.vue";
import factTable from "./UI/table/watchReport/fact-table.vue";
import planTable from "./UI/table/watchReport/plan-table.vue";
import problemsTable from "./UI/table/watchReport/problems-table.vue";
import navbarComp from "./navbar-comp.vue";
import userCard from "./cards/user-card.vue";
import objectCard from "./cards/object-card.vue";
import reportCard from "./cards/report-card.vue";
import complexCard from "./cards/complex-card.vue";
import userSort from "./sorts/userSort.vue";
import complexSort from "./sorts/complexSort.vue";
import objectSort from "./sorts/objectSort.vue";
import reportsByWorkTypeSort from "./sorts/reportsByWorkTypeSort.vue";
import reportsSort from "./sorts/reportsSort.vue";

export default [
  loader,
  textField,
  changePencilButton,
  fileInput,
  modal,
  autocompleteField,
  primaryButton400,
  deleteCrossButton,
  agreeButton400,
  deleteButton400,
  changeButton400,
  primaryRouterButton400,
  primaryButton200,
  agreeButton200,
  deleteButton200,
  deleteRouterButton200,
  changeButton200,
  primaryRouterButton200,
  mainWorksTable,
  additionalWorksTable,
  createReportTable,
  textareaField,
  navbarComp,
  userCard,
  objectCard,
  reportCard,
  complexCard,
  userSort,
  complexSort,
  objectSort,
  reportsByWorkTypeSort,
  reportsSort,
  factTable,
  planTable,
  problemsTable,
];
