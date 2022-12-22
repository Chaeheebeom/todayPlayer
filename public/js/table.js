const table = (function () {
  let maxLine = 1;

  /**
   * 테이블 레이아웃을 만드는 함수
   * @param {string} divId
   * @param {object} columnDefine
   * let columnDefine = [
   *    {
   *        type:  'text', 'checkbox', 'number', 'textarea' 'string'
   *        id: 스트링값 없으면 빈칸
   *        name: 스트링값 없으면 빈칸
   *        event: { action: "click", fn: motherCheckboxEvent },
   *        style: {
   *            width:20%,
   *            height:30%
   *        }
   *        line: 줄수
   *        colspan: 가로병합
   *        rowspan: 세로병합
   *    }
   * ]
   * @returns {string} tbodyId를 리턴
   */
  function makeTableLayout(divId, columnDefine) {
    let tbodyId = "";
    if (divId == "") {
      console.error("divId값이 없습니다");
      return tbodyId;
    }
    try {
      initDiv(divId);

      checkColumnDefine(columnDefine);

      let table = document.createElement("table");
      table.style.minWidth = "100%";
      table.style.tableLayout = "fixed";

      let thead = document.createElement("thead");
      let tbody = document.createElement("tbody");
      tbodyId = generateRandomString(10);
      tbody.id = tbodyId;
      let trs = [];
      for (var i = 0; i < maxLine; i++) {
        trs.push(document.createElement("tr"));
      }

      columnDefine.forEach((column) => {
        let td = document.createElement("td");
        if (column.type == "string") {
          td.innerHTML = column.name;
          td.id = column.id;
          if (Object.keys(column.event).length != 0) {
            addEvent(td, column.event);
          }
        } else if (column.type == "textarea") {
          let textarea = document.createElement(column.type);
          textarea.value = column.name;
          textarea.disabled = true;
          textarea.id = column.id;
          if (Object.keys(column.event).length != 0) {
            addEvent(textarea, column.event);
          }
          td.appendChild(textarea);
        } else {
          let input = document.createElement("input");
          input.type = column.type;
          input.id = column.id;
          column.type != "checkbox" ? (input.disabled = true) : null;
          if (column.type == "checkbox") {
            input.innerHTML = column.name;
          } else if (column.type == "text" || column.type == "number") {
            input.value = column.name;
          }
          if (Object.keys(column.event).length != 0) {
            addEvent(input, column.event);
          }
          td.appendChild(input);
        }

        td.colSpan = column.colSpan;
        td.rowSpan = column.rowSpan;
        if (Object.keys(column.style).length != 0) {
          for (key in column.style) {
            td.style[key] = column.style[key];
          }
        }
        trs[column.line - 1].appendChild(td);
      });

      trs.forEach((tr) => thead.appendChild(tr));

      table.appendChild(thead);
      table.appendChild(tbody);

      document.querySelector("#" + divId).appendChild(table);
    } catch (e) {
      console.error(e);
    }
    return tbodyId;
  }

  function initDiv(divId) {
    document
      .querySelector("#" + divId)
      .childNodes.forEach((node) => node.remove());
  }

  function generateRandomString(num) {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    let charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  function checkColumnDefine(columnDefine) {
    if (!Array.isArray(columnDefine))
      throw "columnDefine 타입은 배열 타입이어야 합니다.";

    maxLine = 1;

    columnDefine.forEach((column) => {
      column.type == null ? (column.type = "string") : null;
      column.id == null ? (column.id = "") : null;
      column.name == null ? (column.name = "") : null;
      column.style == null ? (column.style = {}) : null;
      column.event == null ? (column.event = {}) : null;

      column.line == null ? (column.line = 1) : null;
      column.colspan == null ? (column.colspan = 1) : null;
      column.rowspan == null ? (column.rowspan = 1) : null;

      if (typeof column.type != "string") {
        throw "type의 타입은 string 타입이어야 합니다.";
      }
      if (
        column.type != "text" &&
        column.type != "checkbox" &&
        column.type != "number" &&
        column.type != "textarea" &&
        column.type != "string"
      ) {
        throw 'type의 값은 아래중 하나이어야만 합니다. \r\n  "text", "checkbox", "number", "textarea", "string"';
      }
      if (typeof column.id != "string") {
        throw "id의 타입은 string 타입이어야 합니다.";
      }
      if (typeof column.name != "string") {
        throw "name의 타입은 string 타입이어야 합니다.";
      }
      if (typeof column.style != "object") {
        throw "style의 타입은 object 타입이어야 합니다.";
      }
      if (typeof column.line != "number") {
        throw "line의 타입은 string 타입이어야 합니다.";
      }
      if (typeof column.colspan != "number") {
        throw "colspan의 타입은 string 타입이어야 합니다.";
      }
      if (typeof column.rowspan != "number") {
        throw "rowspan의 타입은 string 타입이어야 합니다.";
      }
      if (typeof column.event != "object") {
        throw "event의 타입은 object 타입이어야 합니다.";
      }
      column.line > maxLine ? (maxLine = column.line) : null;
    });
  }
  /**
   * 테이블에 정보를 집어넣는 함수
   * @param {string} tbodyId
   * @param {object} data
   * let data = [
   *    {
   *        key_1: value_1,
   *        key_2: value_2,
   *            .....
   *        key_n: key_n
   *    }
   * ]
   * @param {object} rowDefine
   *
   * let rowDefine = [
   * {
   *   type:'text', 'checkbox', 'number', 'textarea' 'string'
   *    key:
   * }
   * ]
   */
  function buildTable(tbodyId, dataArr, rowDefine) {
    try {
      checkRowDefine(rowDefine);

      let trs = [];
      let id = 0;
      dataArr.forEach((data) => {
        let tr = document.createElement("tr");

        rowDefine.forEach((define) => {
          let td = document.createElement("td");

          if (define.type == "string") {
            td.innerHTML = getDataBykey(data, define.key);
            if (Object.keys(define.event).length != 0) {
              addEvent(td, define.event, data);
            }
            td.className = define.class;
          } else if (define.type == "textarea") {
            let textarea = document.createElement(define.type);
            textarea.value = getDataBykey(data, define.key);
            textarea.id = "td_" + define.key + "_" + String(id);

            if (Object.keys(define.event).length != 0) {
              addEvent(textarea, define.event, data);
            }
            textarea.className = define.class;
            td.appendChild(textarea);
          } else {
            let input = document.createElement("input");
            input.type = define.type;
            input.id = "td_" + define.key + "_" + String(id);
            if (define.type == "checkbox") {
              input.innerHTML = getDataBykey(data, define.key);
            } else if (define.type == "text" || define.type == "number") {
              input.value = getDataBykey(data, define.key);
            }
            if (Object.keys(define.event).length != 0) {
              addEvent(input, define.event, data);
            }
            input.className = define.class;
            td.appendChild(input);
          }
          tr.appendChild(td);
        });
        id++;
        trs.push(tr);
      });

      initTbody(tbodyId);
      trs.forEach((tr) =>
        document.querySelector("#" + tbodyId).appendChild(tr)
      );
    } catch (e) {
      console.error(e);
    }
  }

  function initTbody(tbodyId) {
    let trs = document.querySelector("#" + tbodyId).childNodes;
    for (var i = trs.length - 1; i > -1; i--) trs[i].remove();
  }

  function addEvent(tag, event, data = {}) {
    tag.addEventListener(event.action, (me) => event.fn(me, data));
  }

  function getDataBykey(data, key) {
    return data[key] ? data[key] : "";
  }

  function checkRowDefine(rowDefine) {
    rowDefine.forEach((define) => {
      define.type == null ? (define.type = "string") : null;
      define.key == null ? (define.key = "") : null;
      define.event == null ? (define.event = {}) : null;
      define.class == null ? (define.class = "") : null;

      if (typeof define.type != "string") {
        throw "type의 타입은 string 타입이어야 합니다.";
      }
      if (typeof define.class != "string") {
        throw "class의 타입은 string 타입이어야 합니다.";
      }
      if (typeof define.key != "string") {
        throw "key의 타입은 string 타입이어야 합니다.";
      }
      if (typeof define.event != "object") {
        throw "event의 타입은 object 타입이어야 합니다.";
      }
    });
  }

  return { makeTableLayout: makeTableLayout, buildTable: buildTable };
})();
