$(document).ready(function () {

    console.log('ready');
    fillDetail();
    fillheader();

    // GENERATE QR CODE
    element       = document.getElementById('date_id');
    element.value = new Date();

    qrcode = new QRCode(document.getElementById("qrcode"), {
        width : 100,
        height : 100
    });

    makeCode();
    $("#text").
        on("blur", function () {
            makeCode();
        }).
        on("keydown", function (e) {
            if (e.keyCode == 13) {
                makeCode();
        }
    });

})
var qrcode  = '';
var element = '';

var UNITS = [
    {
        id: 1,
        description: 'UNIT'
    },
    {
        id: 2,
        description: 'BOX'
    },
    {
        id: 3,
        description: 'DOZEN'
    }
]

var POINT_OF_SALES_ID = [
    {
        id: 1,
        description: 'CENTRAL',
        address: 'UNION NEAR BRIDGE RED',
        active: true
    }
]

var PRODUCTS = [
    {
        id: 1,
        description: 'JUEGO DE MESA BINGO',
        unit_id: 1,
        price: 100,
        itbis: 14,
        active: true
    },
    {
        id: 2,
        description: 'MUÑECA DE PORCELANA',
        unit_id: 1,
        price: 75,
        itbis: 10,
        active: true
    },
    {
        id: 3,
        description: 'ROMPECABEZAS 500 PIEZAS',
        unit_id: 1,
        price: 50,
        itbis: 7,
        active: true
    },
    {
        id: 4,
        description: 'PAQUETE DE CRAYONES (24 COLORES)',
        unit_id: 1,
        price: 15,
        itbis: 2.1,
        active: true
    },
    {
        id: 5,
        description: 'SET DE PINTURA AL ÓLEO',
        unit_id: 1,
        price: 120,
        itbis: 16.8,
        active: true
    },
    {
        id: 6,
        description: 'LIBRO DE CUENTOS INFANTILES',
        unit_id: 1,
        price: 30,
        itbis: 4.2,
        active: true
    },
    {
        id: 7,
        description: 'PUZZLE 3D TORRE EIFFEL',
        unit_id: 1,
        price: 45,
        itbis: 6.3,
        active: true
    },
    {
        id: 8,
        description: 'SET DE FIGURAS DE ACCIÓN',
        unit_id: 1,
        price: 80,
        itbis: 11.2,
        active: true
    },
    {
        id: 9,
        description: 'JUEGO DE AJEDREZ PROFESIONAL',
        unit_id: 1,
        price: 60,
        itbis: 8.4,
        active: true
    },
    {
        id: 10,
        description: 'PUZZLE DE MAPA DEL MUNDO (1000 PIEZAS)',
        unit_id: 1,
        price: 35,
        itbis: 4.9,
        active: true
    }
]

var DETAIL = [
    {
        product_id: 1,
        quantity: 10,
        unit_id: 1,
        price: 100,
        itbis: 14
    },
    {
        product_id: 2,
        quantity: 5,
        unit_id: 2,
        price: 75,
        itbis: 10
    },
    {
        product_id: 3,
        quantity: 20,
        unit_id: 3,
        price: 150,
        itbis: 18
    },
    {
        product_id: 4,
        quantity: 8,
        unit_id: 1,
        price: 90,
        itbis: 12
    },
    {
        product_id: 5,
        quantity: 15,
        unit_id: 2,
        price: 120,
        itbis: 14
    },
    {
        product_id: 6,
        quantity: 12,
        unit_id: 1,
        price: 110,
        itbis: 16
    },
    {
        product_id: 7,
        quantity: 7,
        unit_id: 3,
        price: 80,
        itbis: 10
    },
    {
        product_id: 8,
        quantity: 25,
        unit_id: 2,
        price: 170,
        itbis: 20
    },
]

var HEADER = {
    id: 1,
    employee_id: 1,
    employee_name: 'Edilson Alcantara',
    customer_id: 1,
    customer_name: 'Franklin Alcantara',
    point_of_sales_id: 1,
    date: '2024-01-30',
    time: '10:01 PM',
    total_amount: 100,
    is_credit: false,
    is_void: false,
    ncf: ''
}

function fillDetail() {
    let content = ``;

    let total       = 0;
    let sub_total   = 0;
    let itbis_total = 0;

    if (DETAIL.length > 0) {
        DETAIL.forEach(row => {

            let { product_id, price, itbis, quantity } = { ...row };
            let product_data = PRODUCTS.find(el => el.id == product_id);
            let unit_data = UNITS.find(el => el.id == product_data.unit_id);

            itbis_total += parseFloat(price * (itbis / 100));
            sub_total   += parseFloat((price / ((itbis / 100))));
            total       += parseFloat((price * (1 + (itbis / 100)) * quantity));

            content += `<tr>`;
            content += `    <td style="padding: 0px;" class="text-center">${product_id}                                                             </td>`;
            content += `    <td style="padding-left: 5px;" class="text-left">${product_data['description']}                                         </td>`;
            content += `    <td style="padding: 0px;" class="text-center"> ${unit_data['description']}                                               </td>`;
            content += `    <td style="padding: 0px;" class="text-center"> ${product_data.itbis}                                                    </td>`;
            content += `    <td style="padding: 0px;" class="text-center"> ${quantity}                                                              </td>`;
            content += `    <td style="padding-right: 5px;" class="text-right"> ${parseFloat(price).toFixed(2)}                                     </td>`;
            content += `    <td style="padding-right: 5px;" class="text-right"> ${parseFloat((price / ((itbis / 100)))).toFixed(2)}                 </td>`;
            content += `    <td style="padding-right: 5px;" class="text-right"> ${parseFloat((price * (1 + (itbis / 100)) * quantity)).toFixed(2)} </td>`;
            content += `</tr>`;

        });

    } else {
        $('#detail_invoice_id').html('');
    }

    $('#detail_invoice_id').html(content);

    $('#itbis').html(parseFloat(itbis_total).toFixed(2));
    $('#sub_total').html(parseFloat(sub_total).toFixed(2));
    $('#total').html(parseFloat(total).toFixed(2));
}

function fillheader() {
    let { id, employee_id, employee_name, customer_id, customer_name, point_of_sales_id, date, time, total_amount, is_credit, is_void, ncf } = { ...HEADER };
    $('#qr_code').val(id);
    $('#employee_id').val(employee_id)
    $('#employee_name').val(employee_name)
    $('#customer_id').val(customer_id)
    $('#customer_name').val(customer_name)
    $('#point_of_sales_id').val(point_of_sales_id)
    $('#date_id').val(date)
    $('#time_id').val(time)
    $('#total_amount').val(total_amount)
    $('#is_credit').val(is_credit)
    $('#is_void').val(is_void)
    $('#ncf').val(ncf)
}

function makeCode () {		
    // const invoice_id = parseInt(Math.random() * (10000000 - 0) + 0);
    // console.log('invoice_id',invoice_id);
    // document.getElementById("qr_code");
    var elText = document.getElementById("qr_code");
    if (!elText.value) {
        alert("Input a text");
        elText.focus();
        return;
    }
    let url = 'https://edx3mes.github.io/invoice_template/index.html?id='
    qrcode.makeCode(url + elText.value);
}
