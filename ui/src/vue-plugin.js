import BuildInput from './components/BuildInput.js';
import BuildField from './components/BuildField.js';
import BuildForm from './components/BuildForm.js';

import PickerRows from './components/picker/PickerRows.js';
import PickerView from './components/picker/PickerView.js';


const version = __UI_VERSION__

function install (app) {
  app.component(BuildInput.name, BuildInput)
  app.component(BuildField.name, BuildField)
  app.component(BuildForm.name, BuildForm)

  app.component(PickerRows.name, PickerRows)
  app.component(PickerView.name, PickerView)
}

export {
  version,
  BuildInput,
  BuildField,
  BuildForm,

  PickerRows,
  PickerView,

  install
}
