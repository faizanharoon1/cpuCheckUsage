var helper = {
  bytesConvert: function(bytesVal) {

    if (bytesVal < 1024) {
      return [(bytesVal.toFixed(2)), "Bytes"];
    }
    if (bytesVal < 1048576) {
      return [(bytesVal / 1024).toFixed(2), "KB"];
    }
    if (bytesVal < 1073741824) {
      return [(bytesVal / 1024 / 1024).toFixed(2), "MB"];
    }
    if (bytesVal < 1099511600000) {
      return [(bytesVal / 1024 / 1024 / 1024).toFixed(2), "GB"];
    }
  }
};

module.exports =  helper;

