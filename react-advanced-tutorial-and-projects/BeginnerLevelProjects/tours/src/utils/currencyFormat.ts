const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
 minimumFractionDigits: 2,
  maximumFractionDigits: 3,
});

//12,96 seklinde elimize gelen bir decimal veya float ondalik sayiyi once aradaki virgulu noktaya
//sonra da arada nokta varken oldugu gibi kusurati ile almak icin parseFloat ile ceviriyoruz

export function formatCurrency(price: string | number) {
  if (typeof price !== "string") {
    return CURRENCY_FORMATTER.format(price);
  }
  const num = parseFloat(price.replace(",", "."));
  const curencyFormat= CURRENCY_FORMATTER.format(num);
  return curencyFormat.toString().replace(".",",");
}

