var store = new Persist.Store('hm tree store');

$(document).ready(function() {
	
	init(store, "#hmtree");
	
	$("#hmtree .hm-hit").on("click", function(event) {
		var li = event.target.parentElement;
		toggle(store, $("ul", li), 100);
	});

	$("#hmtree a").on("click", function(event) {
		setSelected(store, $(this).parent());
//				event.preventDefault();
//				event.stopPropagation();
	});
});
