import BuildInput from './components/BuildInput.js';
import BuildField from './components/BuildField.js';
import BuildForm from './components/BuildForm.js';


const version = __UI_VERSION__

function install (app) {
  app.component(BuildInput.name, BuildInput)
  app.component(BuildField.name, BuildField)
  app.component(BuildForm.name, BuildForm)
}

export {
  version,
  BuildInput,
  BuildField,
  BuildForm,

  install
}
