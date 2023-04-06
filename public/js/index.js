function getActions(id) {
    return '<button data-id="' + id + '" class="btn btn-profile" onclick="vote(this)">Oyla</button><button data-id="' + id + '" class="btn btn-profile" onclick="details(this)">Detaylar</button>';
}

function vote(elem){
    postJSON('/api/vote/'+elem.dataset.id, function(a, b) {
        console.log(a)
        if (a.result === 1) {
            $('#table_show').trigger("change");
        }
    }, {id:elem.dataset.id});
}

function details(elem){
    postJSON('/api/user/'+elem.dataset.id, function(a, b) {
        console.log(a)
        if (a.result === 1) {
            var data = JSON.parse(a.data)[0];
            var table_elems = elem.parentNode.parentNode;
            if(table_elems.className !='kt-cell-inner'){
                table_elems = table_elems.parentNode.parentNode.parentNode.firstElementChild;
            }
            console.log(table_elems)
            document.getElementById('image').setAttribute('src',table_elems.children[0].firstElementChild.style.backgroundImage.split('(')[1].split(')')[0].slice(1));
            document.getElementById('full_name').innerHTML = table_elems.children[1].innerHTML+table_elems.children[2].innerHTML;
            document.getElementById('title').innerHTML = table_elems.children[3].innerHTML;
            document.getElementById('vote_count').innerHTML = table_elems.children[4].innerHTML;
            document.getElementById('phone').innerHTML = data['phone'];
            document.getElementById('days_available').innerHTML = data['days_avail'];
            document.getElementById('gender').innerHTML = data['gender'];
            document.getElementById('address').innerHTML = data['phone'];
            document.getElementById('birth_date').innerHTML = data['birth'];
            document.getElementById('page_1').className = "page open";
            location.href="#page_1"
        }
    }, {id:elem.dataset.id}, { b: elem });

}