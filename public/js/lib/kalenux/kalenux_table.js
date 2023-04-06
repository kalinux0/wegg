function setTemplates() {
    var a, b, c, d, e, f, g, h, i;
    a = document.getElementsByTagName('kalenux-template');
    b = a.length;
    for (i = 0; i < b; i++) {
        c = a[i];
        if (!c) {
            continue;
        }
        d = c.id;

        if (!tables[d]) {
            tables[d] = {};
        }
        if (c.dataset.types) {
            e = c.dataset.types.split(',');
            f = e.length;
            tables[d].template_type = c.dataset.type;
            tables[d].template = {};
            c = c.innerHTML;
            for (g = 0; g < f; g++) {
                h = e[g].toString();
                tables[d].template[h] = c.substring(c.indexOf('<t_' + h + '>') + h.length + 4, c.indexOf('</t_' + h + '>'));
            }
        } else {
            tables[d]['template'] = c.innerHTML;
        }
    }
}

function setNavs(table) {
    var a, b, i, c, d, e, f, g, h, j, m;
    c = Math.ceil(table.count / table.data.limit);
    if (table.data.start > table.count) {
        table.navs.parentNode.dataset.status = 'last';
    } else {
        table.navs.parentNode.dataset.status = '';
    }
    e = table.page;
    d = e + 5;
    f = e - 5;
    b = table.navs.parentNode;
    b.innerHTML = '';
    j = table_texts;
    h = j.nav_order;
    for (i = -1; i >= -2; i--) {
        a = document.createElement('button');
        a.className = 'ktn-item ktn-part';
        a.innerHTML = j[h[i]];
        a.onclick = setNav.bind(null, i, table);
        b.appendChild(a);
    }

    a = document.createElement('div');
    a.className = 'ktn-part ktn-parts';
    b.appendChild(a);
    table.navs = a;

    for (i = -3; i >= -4; i--) {
        a = document.createElement('button');
        a.className = 'ktn-item ktn-part';
        a.innerHTML = j[h[i]];
        a.onclick = setNav.bind(null, i, table);
        b.appendChild(a);
    }

    for (i = 1; i <= c; i++) {
        if (i > d && i !== c) {
            continue;
        } else if (i < f && i !== 1) {
            continue;
        }
        b = document.createElement('button');
        if (i == e) {
            m = true;
            if (i != c) {
                table.navs.parentNode.dataset.page = i;
            } else {
                table.navs.parentNode.dataset.page = -1;
            }
        } else {
            m = false;
        }
        b.className = "ktn-item " + (m ? 'active' : '');
        b.innerHTML = i;
        b.onclick = setNav.bind(null, i, table);
        table.navs.appendChild(b);
    }
}

function startKalenux() {
    tables = {};
    if (typeof table_texts === 'undefined') {
        table_texts = {
            nav_order: {
                "-1": 'first',
                "-2": 'prev',
                "-3": 'next',
                "-4": 'last'
            },
            first: 'İlk',
            prev: 'Önceki',
            next: 'Sonraki',
            last: 'Son'
        }
    }
    setTemplates();

    setTables();


}

function adjustWidths() {

    if (!tables) {
        return;
    }
    for (table in tables) {
        table = tables[table];
        if (!table) {
            continue;
        }
        adjustWidth(table);
    }
}

function setWidths(table) {
    var a, b, c, d, e, f, i, j;

    a = table.table.getElementsByClassName('kt-cell');
    b = a.length;
    for (i = 0; i < b; i++) {
        c = a[i];
        d = c.getElementsByClassName('kt-item');
        e = d.length;
        for (j = 0; j < e; j++) {
            f = d[j];
            if (!table.widths[j] || table.widths[j] < f.offsetWidth) {
                if (f.offsetWidth > 100) {
                    table.widths[j] = f.offsetWidth;
                } else {
                    table.widths[j] = 100
                }
            }
        }
    }
}

function openHandlers(table, a) {
    var b, c, i;
    if (a.classList.contains('icon-plus')) {
        a.classList.remove('icon-plus');
        a.classList.add('icon-minus');
        b = table.table.getElementsByClassName('kt-handle');
        c = b.length;
        for (i = 0; i < c; i++) {
            d = b[i];
            openHandler(d);
        }
        a.parentNode.dataset.state = 'open';
    } else {
        a.classList.remove('icon-minus');
        a.classList.add('icon-plus');
        b = table.table.getElementsByClassName('kt-handle');
        c = b.length;
        for (i = 0; i < c; i++) {
            d = b[i];
            closeHandler(d);
        }
        a.parentNode.dataset.state = '';
    }
}

function changeHandler(a) {
    if (a.classList.contains('icon-plus')) {
        openHandler(a);
    } else {
        closeHandler(a);
    }
}

function getMinWidth(elem) {
    var a = document.createElement('div');
    a.className = 'kt-check-width';
    a.style.width = 'auto';
    a.style.position = 'absolute';
    a.style.right = '-1000px';
    a.style.whiteSpace = 'nowrap';
    a.innerHTML = elem.outerHTML;
    document.body.appendChild(a);
    r = a.firstElementChild.offsetWidth;
    document.body.removeChild(a);
    return r;
};

function openHandler(a) {
    a.classList.remove('icon-plus');
    a.classList.add('icon-minus');
    a.parentNode.parentNode.dataset.state = 'open';
    if (!a.dataset.widthed) {
        var b, c, d, e, i;
        a.dataset.widthed = true;
        b = a.parentNode.parentNode.lastElementChild.getElementsByClassName('kt-handler-head');
        c = b.length;
        d = 0;
        for (i = 0; i < c; i++) {
            e = getMinWidth(b[i]);
            if (e > d) {
                d = e;
            }
        }
        for (i = 0; i < c; i++) {
            b[i].style.width = d + 'px';
        }
    }
}

function closeHandler(a) {
    a.classList.remove('icon-minus');
    a.classList.add('icon-plus');
    a.parentNode.parentNode.dataset.state = '';
}

function adjustWidth(table) {
    var a, b, c, d, e, f, g, h, i, j, k, m, l, table_holder;

    table_holder = table.table;
    g = table.widths;
    h = g.length;
    k = 0;
    f = table_holder.offsetWidth;
    if (table_holder.getElementsByClassName('kt-handle').length) {
        f -= table_holder.getElementsByClassName('kt-handle')[0].offsetWidth;
    }
    for (i = 0; i < h; i++) {
        k += g[i];
    }
    while (f < k) {
        h -= 1;
        k -= g[h];
    }
    a = table_holder.getElementsByClassName('kt-cell');
    b = a.length;
    for (i = 0; i < b; i++) {
        c = a[i];
        d = c.getElementsByClassName('kt-item');
        e = d.length;
        deactivate = false;
        for (j = 0; j < e; j++) {
            f = d[j];
            f.style.minWidth = g[j] + 'px';
            if (j < h) {
                if (f.classList.contains('kt-deactive') === true) {
                    f.classList.remove('kt-deactive');
                }
            } else {
                if (f.classList.contains('kt-deactive') === false) {
                    f.classList.add('kt-deactive');
                }
                deactivate = true;
            }
        }
        if (deactivate) {
            c.dataset.deactived = "true";
            table_holder.getElementsByClassName('kt-header')[0].lastElementChild.dataset.state = "open";
            if (c.getElementsByClassName('kt-handlers').length) {
                c.getElementsByClassName('kt-handlers')[0].remove();
            }
            e = c.getElementsByClassName('kt-item');
            f = e.length;
            k = table_holder.getElementsByClassName('kt-head');
            d = document.createElement('div');
            d.className = 'kt-handlers';
            max_width = 0;
            for (j = 0; j < f; j++) {
                if (!e[j]) {
                    continue;
                }
                if (e[j].classList.contains('kt-deactive')) {
                    m = document.createElement('div');
                    m.className = 'kt-handler';
                    g = document.createElement('div');
                    g.className = 'kt-handler-head';
                    g.innerHTML = k[j].outerHTML;
                    m.appendChild(g);

                    g = document.createElement('div');
                    g.className = 'kt-handler-body';
                    g.innerHTML = e[j].outerHTML;

                    m.appendChild(g);
                    d.appendChild(m);
                }
            }
            if (!c.firstElementChild.lastElementChild || !c.firstElementChild.lastElementChild.classList.contains('kt-handle')) {
                e = document.createElement('span');
                e.className = 'kt-handle icon-plus';
                e.dataset.state = "open";
                e.onclick = changeHandler.bind(null, e);
                c.firstElementChild.appendChild(e);
            } else {
                c.firstElementChild.lastElementChild.dataset.state = "open";
            }
            c.appendChild(d);
        } else {
            c.dataset.deactived = "false";
            if (c.firstElementChild.lastElementChild.classList.contains('kt-handle')) {
                c.firstElementChild.lastElementChild.dataset.state = "";
                table_holder.getElementsByClassName('kt-header')[0].lastElementChild.dataset.state = "";
            }
        }
    }
    a = table_holder.getElementsByClassName('kt-head');
    b = a.length;
    for (i = 0; i < b; i++) {
        c = a[i];
        c.style.minWidth = g[i] + 'px';
        if (i < h) {
            if (c.classList.contains('kt-deactive') === true) {
                c.classList.remove('kt-deactive');
            }
        } else {
            if (c.classList.contains('kt-deactive') === false) {
                c.classList.add('kt-deactive');
            }
        }
    }
}

function setItems(a, table) {
    var b, c = '',
        d, e,
        i, r;
    b = a.length;

    c = table.template;
    d = table.template_type;
    r = '';
    if (typeof c === 'object') {
        for (i = 0; i < b; i++) {
            e = a[i];
            f = e[d];
            r += setTemplate(c[f], e);
        }
    } else {
        for (i = 0; i < b; i++) {
            r += setTemplate(c, a[i]);
        }
    }
    table.holder.innerHTML = r;
    if (typeof kalenuxOnoff !== 'undefined') {
        setElems('kalenux-onoffs', kalenuxOnoff);
    }
}

function setNav(a, table) {
    var b, c, e, i;
    if (typeof table === 'undefined') {
        for (table in tables) {
            table = tables[table];
        }
        if (!table) {
            return;
        }
    }
    
    b = table.count / table.data.limit;
    if (!b || b <= 1) {
        table.navs.dataset.state = 'opage';
    } else {
        table.navs.dataset.state = 'mpage';
    }
    c = Math.ceil(b);
    switch (a) {
        case -1:
            if (table.page == 1) {
                return;
            }
            table.data.start = 0;
            e = 1;
            break;
        case -2:
            if (table.data.start < table.data.limit) {
                table.data.start = 0;
                return;
            }
            table.data.start -= table.data.limit;
            e = Math.ceil(table.data.start / table.data.limit) + 1;
            break;
        case -3:
            e = Math.ceil((parseInt(table.data.start) + table.data.limit) / table.data.limit) + 1;
            if (e > c) {
                return;
            }
            table.data.start = parseInt(table.data.start) + table.data.limit;
            break;
        case -4:
            table.data.start = Math.floor(b) * table.data.limit;
            e = Math.ceil(table.data.start / table.data.limit) + 1;
            if (table.count % table.data.limit === 0) {
                table.data.start -= table.data.limit;
                e -= 1;
            }
            if (table.page == e) {
                return;
            }
            break;
        default:
            table.data.start = (a - 1) * table.data.limit;
            e = a;
            break;
    };
    table.page = e;
    updateTable(table);

}

function changeOrder(table, a, b, event) {
    if (a.dataset.order === '1') {
        c = '0';
    } else {
        c = '1';
    }
    a.dataset.order = c;
    if (!event.shiftKey) {
        delete table.data.order;
        table.data.order = {};
    }
    table.data.order[b] = c;
    updateTable(table);
}

function setTables() {
    startsetTables();

    function startsetTables() {
        var a, b, c, d;
        a = document.getElementsByClassName('kalenux-tables');
        b = a.length;
        for (c = 0; c < b; c++) {
            d = a[0];
            setTable(d);
            d.className = 'kalenux-table-holder';
        }
    }

    function setHeader(table, a) {
        var b, c, d, r = document.createElement('div');
        r.className = 'kt-header';
        a = a.split(',');
        b = a.length;
        for (c = 0; c < b; c++) {
            d = a[c];
            e = document.createElement('div');
            e.className = 'kt-head';
            e.innerHTML = d;
            e.onclick = changeOrder.bind(event, table, e, c);
            r.appendChild(e);
        }
        e = document.createElement('div');
        e.className = 'kt-head-plus icon-plus';
        e.onclick = openHandlers.bind(null, table, e);
        r.appendChild(e);
        return r;
    }

    function setTable(a) {
        var b, c, d, e, f, g, i, n;
        g = a.dataset;
        n = g.id;
        b = g.type;
        b = document.createElement('div');
        b.className = 'kalenux-table';
        if (g.before) {
            eval(g.before);
        }

        tables[n].data = {};
        if (g.data) {
            tables[n].data = JSON.parse(g.data);
        }
        if (g.order) {
            tables[n].data.order = JSON.parse(g.order);
        }
        tables[n].table = b;
        tables[n].data.start = 0;
        if (g.limit) {
            tables[n].data.limit = g.limit;
        } else {
            tables[n].data.limit = 10;
        }
        tables[n].nav = (g.nav === 'true') ? true : false;
        tables[n].count = 0;
        tables[n].page = 1;
        tables[n].url = g.url;
        tables[n].type = g.type;
        tables[n].widths = [];

        c = document.createElement('div');
        c.className = 'kt-top';
        if (g.header) {
            h = setHeader(tables[n], g.header);
            if (h) {
                c.appendChild(h);
            }
        }
        d = document.createElement('div');
        d.className = 'kt-mid';
        e = document.createElement('div');
        e.className = 'kt-bot';
        e.id = 'kt_nav';
        f = document.createElement('div');
        f.className = 'kt-navs';
        tables[n].navs = f;
        tables[n].holder = d;
        e.appendChild(f);
        b.appendChild(c);
        b.appendChild(d);
        b.appendChild(e);
        a.appendChild(b);
        a = document.getElementById('table_filters');
        if (a) {
            a = a.dataset.filters.split(',');
            for (b in a) {
                b = document.getElementById(a[b]);
                if (!b) {
                    continue;
                }
                d = b.dataset;
                e = d.type;
                if (e === 'search') {
                    b.onkeydown = tableSearch.bind(null, tables[n]);
                } else if (e === 'date') {
                    $('#' + b.id).datepicker({
                        onSelect: updateTable.bind(null, tables[n])
                    });
                } else {
                    b.onchange = updateTable.bind(null, tables[n]);
                }
            }

        }

        updateTable(tables[n]);
    }
}

function tableSearch(table, event) {
    var a,b,c,d;
    d = table_filters.dataset.filters.split(',');
    for (a in d) {
        a = d[a];
        a = $('#' + a);
        if (!a) {
            continue;
        }
        b = a.val();
        if (b != '' && b != 0) {
            c = a[0].dataset;
            if (c) {
                c = c.name;
            } else {
                continue;
            }
            if (c == 'limit') {
                table.limit = parseInt(b);
            }
            table.data[c] = b;
        }
    }

    if (event.keyCode == 13) {
        updateTable(table);
        event.preventDefault();
    }
}

function updateTable(table) {
    var a, b, c, d, e, i;

    if (typeof table === 'undefined' || !table) {
        var table = tables[document.getElementsByTagName('kalenux-template')[0].id]
    }

    if (typeof table_filters !== 'undefined' && table_filters) {
        d = table_filters.dataset.filters.split(',');
        for (a in d) {
            a = d[a];
            a = $('#' + a);
            if (!a) {
                continue;
            }
            b = a.val();
            if (b != '' && b != 0) {
                c = a[0].dataset;
                if (c) {
                    c = c.name;
                } else {
                    continue;
                }
                if (c == 'limit') {
                    table.limit = parseInt(b);
                }
                table.data[c] = b;
            }
        }
    }



    c = table.url;
    postJSON(c, function (a, b) {


        if (a.result === 1) {
            var c, d;
            c = b.b;
            d = a.count;
            if (d) {
                setOpen('kt_nav');
            } else {
                return;
            }
            c.count = d;
            setItems(a.data, c);
            setWidths(c);
            adjustWidth(c);
            adjustWidth(c);
            if (c.nav === true) {
                setNavs(c);
            }
        }
    }, table.data, { b: table });
}

function setDelete(elem) {
    setPopup({
        dataset: {
            id: elem.dataset.id,
            del_url: table_del_url
        },
        text: table_del_text,
        actions: [{
            text: 'Evet',
            icon: 'icon-yes',
            onclick: deleteItem
        }, {
            text: 'Hayır',
            icon: 'icon-no',
            onclick: closePopup,
        }]
    });
}

function deleteItem() {
    var a, b;
    a = document.getElementById('popup');
    b = a.dataset;
    var data = {
        id: b.id,
    };
    postJSON(b.del_url, function (a) {
        for (t in table) {
            updateTable(table[t]);
        }
        closePopup();
    }, data);
}

function setMedia(a, b) {
    if (a) {
        return '<div class="table-image" style="background-image:url(' + a + '?' + new Date().getTime() + ')"></div>';
    } else {
        return '<video class="table-video"><source src="' + b + '?' + new Date().getTime() + '" type="video/mp4">"</source></video>';
    }
}

function setDate(a) {
    a = a.split(' ')[0].split('-');
    return a[2] + '.' + a[1] + '.' + a[0];
}

firer.push(function () {
    if (typeof table_filters === 'undefined') {
        table_filters = document.getElementById('table_filters');
    }
    startKalenux();
    window.onresize = adjustWidths;
});