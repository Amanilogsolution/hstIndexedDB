(function () {
  document.getElementById("loading").style.display = "flex";
  let TotalData = JSON.parse(localStorage["packSkuDatas"]);
  let value = Number(localStorage.getItem("SKUDATA"));

  const data = TotalData.filter((data) => data.PACK_NO == value);
  var skuData = [];
  data.forEach((value, index) => {
    skuData.push(` 
            <tr class="text-center" style="font-size:12px">
            <td>${index + 1}</td>
            <td class="text-wrap">${value.SKU_NAME}</td>
            <td>${value.SKU_QTY}</td>
            <td>${value.PACK_EXPIRY}</td>
            </tr>
		`);
  });
  document.getElementById("loading").style.display = "none";
  let str = skuData.toString().replaceAll(",", "");
  document.getElementById("skuData").innerHTML = str;
})();
