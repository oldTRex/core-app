import React, { Component } from "react";
import ReactJson from "react-json-view";

class Postman extends Component {
  state = {
    form: {
      method: "GET",
      url: "",
      queryParams: "",
      body: []
    },
    baseUrl: "",
    token: "",
    data: {},
    loading: false,
    bodyType: "application/json",
    collection: []
  };

  toggle = () => {
    this.setState(state => ({
      loading: !state.loading
    }));
  };
  componentDidMount() {
    const baseUrl = localStorage.getItem("baseUrl");
    const token = localStorage.getItem("token");
    const collection = JSON.parse(localStorage.getItem("collection"));
    const { item } = collection;
    if (item) {
      this.setState({
        collection: item
      });
    }
    if (baseUrl) {
      this.setState(
        {
          baseUrl
        },
        () =>
          this.setState({
            form: {
              ...this.state.form,
              url: baseUrl
            }
          })
      );
    }
    if (token) {
      this.setState({
        token
      });
    }
  }

  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState(state => ({
      form: {
        ...state.form,
        [name]: value
      }
    }));
  };

  handleVariablesChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    const saveToLocalStorage = () => {
      localStorage.setItem(name, value);
    };
    this.setState(
      state => ({
        [name]: value
      }),
      saveToLocalStorage
    );
  };
  handleSubmit = e => {
    this.toggle();
    e.preventDefault();
    const { form, bodyType, token } = this.state;

    const getFormData = data => {
      const fd = new FormData();
      data.forEach(({ key, value }, i) => {
        fd.append(key, value);
      });

      return fd;
    };
    const getJson = data => {
      const obj = {};
      data.forEach(({ key, value }) => {
        obj[key] = value;
      });
    };
    const getOptions = () => {
      if (form.method == "post") {
        return {
          method: form.method.toUpperCase(),
          body:
            bodyType == "application/json"
              ? JSON.stringify(getJson(form.body))
              : getFormData(form.body),
          headers: {
            "Content-Type":
              bodyType == "json"
                ? "application/json"
                : "application/x-www-form-urlencoded",
            Authorization: "Bearer " + token
          }
        };
      } else {
        return {
          headers: {
            Authorization: "Bearer " + token
          }
        };
      }
    };
    fetch(form.url, getOptions())
      .then(res => res.json())
      .then(data =>
        this.setState({
          data
        })
      )
      .finally(this.toggle);
    console.log("form", this.state.form);
  };
  formBody = method => {
    switch (method) {
      case "GET":
        let key = "";
        let value = "";
        const handleSubmit = e => {
          e.preventDefault();
          const newQueryParams = new URLSearchParams(
            this.state.form.queryParams
          );
          if (newQueryParams.has(key)) {
            newQueryParams.set(key, value);
          } else {
            newQueryParams.append(key, value);
          }
          this.setState(
            state => ({
              form: {
                ...state.form,
                queryParams: newQueryParams.toString()
              }
            }),
            () =>
              this.setState(state => {
                const url = new URL(state.form.url);
                url.search = newQueryParams;
                return {
                  form: {
                    ...state.form,
                    url: url.toString()
                  }
                };
              })
          );
        };
        const {
          form: { queryParams }
        } = this.state;
        return (
          <div
            style={{
              marginTop: 30,
              borderTop: "1px solid #ddd",
              paddingTop: 10
            }}
          >
            <h3 style={{ width: "100%", display: "block" }}> query params</h3>
            <form onSubmit={handleSubmit} style={{ display: "flex" }}>
              <input
                type="text"
                onChange={e => (key = e.target.value)}
                style={{ flexGrow: "1", marginRight: 5 }}
                placeholder="key"
              />
              <input
                type="text"
                onChange={e => (value = e.target.value)}
                style={{ flexGrow: "1", marginRight: 5 }}
                placeholder="key"
              />
              <button style={{ flexGrow: 1 }} type="submit">
                add
              </button>
            </form>
          </div>
        );
        break;
      default:
        const changeBody = () => {
          this.setState(state => ({
            form: {
              ...state.form,
              body: state.form.body.concat({ key, value })
            }
          }));
          //   const fd = new FormData();
          //   for (var i in jsonBody) {
          //     fd.append(i, jsonBody[i]);
          //   }
        };

        const handleChange = event => {
          const name = event.target.name;
          const eValue = event.target.value;
          if (event.target.name == "key") {
            key = eValue;
          } else {
            value = eValue;
          }
        };
        return (
          <div
            style={{
              marginTop: 30,
              borderTop: "1px solid #ddd",
              paddingTop: 10
            }}
          >
            <h3 style={{ width: "100%", display: "block" }}>body</h3>
            <select
              onChange={e =>
                this.setState({
                  bodyType: e.target.value
                })
              }
            >
              <option value="application/json">json</option>
              <option value="application/x-www-form-urlencoded">
                formdata
              </option>
            </select>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {this.state.form.body.map((item, i) => {
                return (
                  <div
                    key={"body" + i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between"
                    }}
                  >
                    <input
                      type="text"
                      value={item.key}
                      onChange={({ target: { value } }) => {
                        this.setState(state => ({
                          form: {
                            ...state.form,
                            body: state.form.body.map(body =>
                              body.key == item.key && body.value == item.value
                                ? {
                                    key: value,
                                    value: body.value
                                  }
                                : body
                            )
                          }
                        }));
                      }}
                      placeholder="key"
                      style={{ flexGrow: 1, marginRight: 5, marginBottom: 5 }}
                    />
                    <input
                      type="text"
                      value={item.value}
                      onChange={({ target: { value } }) => {
                        this.setState(state => ({
                          form: {
                            ...state.form,
                            body: state.form.body.map(body =>
                              body.key == item.key && body.value == item.value
                                ? {
                                    key: body.key,
                                    value: value
                                  }
                                : body
                            )
                          }
                        }));
                      }}
                      placeholder="value"
                      style={{ flexGrow: 1, marginRight: 5, marginBottom: 5 }}
                    />
                  </div>
                );
              })}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between"
                }}
              >
                <input
                  type="text"
                  name="key"
                  onChange={handleChange}
                  placeholder="key"
                  style={{ flexGrow: 1, marginRight: 5 }}
                />
                <input
                  type="text"
                  name="value"
                  onChange={handleChange}
                  placeholder="value"
                  style={{ flexGrow: 1, marginRight: 5 }}
                />
                <button style={{ flexGrow: 1 }} onClick={changeBody}>
                  add
                </button>
              </div>
            </div>
          </div>
        );
    }
  };
  changeFile = event => {
    var reader = new FileReader();
    reader.onload = this.onReaderLoad;
    reader.readAsText(event.target.files[0]);
  };

  onReaderLoad = event => {
    console.log(event.target.result);
    var obj = JSON.parse(event.target.result);
    localStorage.setItem("collection", JSON.stringify(obj));
    console.log("obj", obj);
  };

  clickCollection = item => {
    console.log(item);
    this.setState(state => ({
      form: {
        ...state.form,
        url: item.request.url.raw,
        method: item.request.method
      }
    }));
  };
  render() {
    const { form, baseUrl, token, loading, collection } = this.state;

    return (
      <div style={{ direction: "ltr", textAlign: "left", display: "flex" }}>
        <div style={{ width: "20%" }}>
          {collection &&
            collection.map((item, index) => {
              return (
                <a
                  key={"item" + index}
                  style={{
                    display: "block",
                    borderBottom: "1px solid #ddd",
                    cursor: "pointer",
                    width: "80%",
                    marginTop: 10
                  }}
                  onClick={() => this.clickCollection(item)}
                >
                  {item.name}
                </a>
              );
            })}
        </div>
        <div style={{ width: "80%" }}>
          <div>
            <label>
              import file
              <input type="file" onChange={this.changeFile} />
            </label>
          </div>
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <input
              type="text"
              value={baseUrl}
              onChange={this.handleVariablesChange}
              name="baseUrl"
              style={{ flexGrow: "1", marginRight: 5 }}
              placeholder="baseUrl"
            />
            <input
              type="text"
              value={token}
              onChange={this.handleVariablesChange}
              name="token"
              style={{ flexGrow: "1" }}
              placeholder="token"
            />
          </div>
          <form
            onSubmit={this.handleSubmit}
            style={{
              direction: "ltr",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <select
                onChange={this.handleChange}
                value={form.method}
                name="method"
              >
                <option value="get">get</option>
                <option value="post">post</option>
              </select>
              <input
                type="text"
                value={form.url}
                onChange={this.handleChange}
                name="url"
                style={{ flexGrow: "1" }}
              />
              <button type="submit">send</button>
            </div>
          </form>
          {this.formBody(form.method)}
          <div
            style={{
              borderTop: "1px solid #ddd",
              marginTop: 30,
              paddingTop: 10
            }}
          >
            <h3>response</h3>
            {loading ? "loading" : <ReactJson src={this.state.data} />}
          </div>
        </div>
      </div>
    );
  }
}

export default Postman;
