function kalenuxOnoff(a) {
    var b, c, d, e, f, g, h, j, i;
    e = document.createElement('div');
    e.className = 'kalenux-onoff-bar';
    f = document.createElement('input');
    f.className = a.className.replace('kalenux-onoffs', 'kalenux-onoff');
    if (a.id) {
        f.id = a.id;
    }

    g = Object.keys(a.dataset);
    for (h in g) {
        j = g[h];
        f.dataset[j] = a.dataset[j];
    }

    f.dataset.type = 'onoff';
    f.type = 'checkbox';
    g = document.createElement('div');
    g.className = 'kalenux-onoff-toggle';
    b = a.parentNode;
    e.appendChild(g);
    b.appendChild(f);
    b.appendChild(e);
    if (a.className.indexOf('kalenux-change') != -1) {
        f.className = 'kalenux-onoff kalenux-change';
        g = true;
    } else {
        g = false;
    }

    if (a.onchange && a.onchange.toString().indexOf('onchange') != -1) {
        e = a.outerHTML.split('onchange="')[1];
        e = e.split('"')[0];
    } else {
        e = '';
    }

    if (a.value == 1) {
        f.outerHTML = f.outerHTML.replace('data-name', 'checked = "true" data-name')
    }

    a.remove();

    f = b.firstElementChild;

    if (g && typeof setChanged !== 'undefined') {
        f.outerHTML = f.outerHTML.replace('data-name', 'onchange = "setChanged(this);' + e + '" data-name')
    } else if (e) {
        f.outerHTML = f.outerHTML.replace('data-name', 'onchange = "' + e + '" data-name')
    }
}

function tableSwitch(a) {
    kalenuxSelectOnOffUpdateTable(a);
}

function kalenuxSelectOnOffUpdateTable(a) {
    data = {
        id: a.dataset.id,
    }
    data[a.dataset.name] = a.checked ? 1 : 0;

    postJSON(
         a.dataset.url,
        function(a, b) {
            if (a.result === 1) {
                good();
            } else {
                error("Bir hata oluştu!");
            }
        },
        data
    );
}

function kalenuxSelectOnoff(a, b) {
    a = document.getElementById(a);
    if (b == 1) {
        a.checked = true;
    } else {
        a.checked = false;
    }
}