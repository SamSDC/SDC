var characteristicsObj = (characteristicsArr) => {
  var obj = {};

  for (var i = 0; i < characteristicsArr.length; i++) {
    var characteristic = characteristicsArr[i];
    var key = Object.keys(characteristic)[0];
    obj[key] = characteristic[key]
  }

  return obj
}

export default characteristicsObj;