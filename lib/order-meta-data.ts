
import {
    type CreateOrder,
    type UpdateOrder,
  } from '@model/order';
  
export function orderMetaData() {
  const metaDatas: CreateOrder["meta_data"] = [];
  metaDatas.push({
    key: "UA",
    value: navigator.userAgent,
  });
  metaDatas.push({
    key: "QUERY",
    value: window.location.href.replace(/^https?:\/\//, ""),
  });
  let utm = "";
  utm = getUTM();
  if (utm != "") {
    metaDatas.push({
      key: "FB_UTM",
      value: utm,
    });
  }
  return metaDatas;
}

export function orderUpdateMetaData(transaction_id: string|undefined) {
  const metaDatas: UpdateOrder["meta_data"] = [];
  if(!transaction_id) {
    return metaDatas;
  }
  metaDatas.push({
    key: "_ppcp_paypal_order_id",
    value: transaction_id,
  });
  metaDatas.push({
    key: "_ppcp_paypal_intent",
    value: "CAPTURE",
  });
  metaDatas.push({
    key: "_ppcp_paypal_payment_mode",
    value: "live",
  });
  return metaDatas;
}

export function getUTM() {
  let utm = "";
  const searchParams = new URLSearchParams(window.location.search);

  const utmSource = searchParams.get("utm_source") || "none";
  const utmMedium = searchParams.get("utm_medium") || "none";
  const utmCamp = searchParams.get("utm_campaign") || "none";
  const utmContent = searchParams.get("utm_content") || "none";
  const utmTerm = searchParams.get("utm_term") || "none";

  if (
    utmSource != "none" ||
    utmMedium != "none" ||
    utmCamp != "none" ||
    utmContent != "none" ||
    utmTerm != "none"
  ) {
    utm =
      utmSource +
      "DHV" +
      utmMedium +
      "DHV" +
      utmCamp +
      "DHV" +
      utmContent +
      "DHV" +
      utmTerm;
  }
  return utm;
}
