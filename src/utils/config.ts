const headers = {
  prefer: 'odata.include-annotations="*"'
}

const createHeaders = {
  'Content-Type': 'application/json;charset=UTF-8',
  prefer: 'return=representation'
}

const updateHeaders = {
  'OData-MaxVersion': '4.0',
  'OData-Version': '4.0',
  Accept: 'application/json',
  'Content-Type': 'application/json;charset=UTF-8',
  prefer: 'return=representation',
  'If-Match': '*'
}

export default {
  headers,
  createHeaders,
  updateHeaders,
  version: 'w1.0.0'
}
