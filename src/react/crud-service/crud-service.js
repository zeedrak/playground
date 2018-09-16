import { observer } from "mobx-react";
import { observable } from "mobx";
import React from "react";
import axios from "axios";

//export store
export class CrudDomain {
  modelName;
  @observable
  isLoading;
  @observable
  model = {};
  constructor() {}
  getModel(modelName) {
    this.isLoading = true;
    if (this.model[modelName]) {
      this.isLoading = false;
      return this.model[modelName];
    }
    return axios.get(`http://localhost:8080/${this.modelName}`).then(res => {
      this.isLoading = false;
      this.model[modelName] = res.data;
      return this.model[modelName];
    });
  }
  createModel(model) {
    return axios.post(`http://localhost:8080/${this.modelName}`, model);
  }
  updateModel(model) {
    return axios.update(`http://localhost:8080/${this.modelName}`, model);
  }
  deleteModel(model) {
    return axios.delete(`http://localhost:8080/${this.modelName}`, model);
  }
}

//create the UI and Domain Stores
let crudDomain = new CrudDomain();

//determine the theme here and load the right login information?
export const Crud = observer(({ modelName, children, render }) => {
  crudDomain.modelName = modelName;
  crudDomain.getModel(modelName);
  return (
    <div>
      {render({
        model: crudDomain.model[modelName],
        getModel: crudDomain.getModel,
        createModel: crudDomain.createModel,
        updateModel: crudDomain.updateModel,
        deleteModel: crudDomain.deleteModel
      })}
    </div>
  );
});
