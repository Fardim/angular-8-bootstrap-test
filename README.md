# DataTable

used ngx-datatable for the table

# Translate

used ngx-translate for translation. Only one translation file for the full application. No feature specific translation as it was not asked.

# Bootstrap

used ngx-bootstrap to use bootstrap and leverage other facilities like Modal, Alert with timeout

# others

Font-Awesome and moment library was used.

## Issues

The api was blocked by CORS policy. There was network hits, but used the static data on catchError on getting the customers data.
Similarly there were error on POST method because of the cors policy. But added the x-client-id: 12345 as headers. Post body is as expected.
{
firstcustomer: base64 of firt customer,
timestamp: current time is ISO format. used moment library.
}
