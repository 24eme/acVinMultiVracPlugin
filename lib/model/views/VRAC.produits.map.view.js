function(doc) {
	
	var fctConvertDateObject = function (dateString) {
    	var m = dateString.match(/^(\d{4})\-(\d{1,2})\-(\d{1,2})/);
    	if (m) {
    		var date = new Date();
    		date.setDate(m[3]);
    		date.setMonth(m[2] - 1);
    		date.setYear(m[1]);
    		return date;
    	}
    	return null;
    }
	
	var fctGetDateCirculation = function (node) {
    	var dateTmp = null;
    	var stringDateTmp = null;
    	if (node.length > 0) {
    		for (var i in node) {
    			var dateNode = fctConvertDateObject(node[i].date);
				if (!dateTmp || (dateNode && dateNode < dateTmp)) {
					dateTmp = dateNode;
					stringDateTmp = node[i].date;
				}
    		}
    	}
    	return stringDateTmp;
    }
	
	if (doc.type != "Vrac") {
		return;
	}

	var numero_archive = doc.numero;
    for(certification in doc.declaration) {
    	if (certification.match(/^certification/g)) {
    		for(genre in doc.declaration[certification]) {
    	    	if (genre.match(/^genre/g)) {
    	    		for(appellation in doc.declaration[certification][genre]) {
    	    			if (appellation.match(/^appellation/g)) {
    	    				var code_appellation = appellation.replace("appellation_","");
    	    	    		for(mention in doc.declaration[certification][genre][appellation]) {
    	    	    			if (mention.match(/^mention/g)) {
    	    	    	    		for(lieu in doc.declaration[certification][genre][appellation][mention]) {
    	    	    	    			if (lieu.match(/^lieu/g)) {
    	    	    	    	    		for(couleur in doc.declaration[certification][genre][appellation][mention][lieu]) {
    	    	    	    	    			if (couleur.match(/^couleur/g)) {
    	    	    	    	    	    		for(cepage in doc.declaration[certification][genre][appellation][mention][lieu][couleur]) {
    	    	    	    	    	    			if (cepage.match(/^cepage/g)) {
    	    	    	    	    	    				var code_cepage = cepage.replace("cepage_","");
    	    	    	    	    	    				var numero_cepage = null;
    	    	    	    	    	    				for(detail in doc.declaration[certification][genre][appellation][mention][lieu][couleur][cepage].detail) {
    	    	    	    	    	    					var produit = doc.declaration[certification][genre][appellation][mention][lieu][couleur][cepage].detail[detail];
    	    	    	    	    	    					if (produit.actif) {
    	    	    	    	    	    						var position = produit.position;
    	    	    	    	    	    						var volume_propose = produit.volume_propose;
    	    	    	    	    	    						var volume_enleve = (produit.volume_enleve > 0)? produit.volume_enleve : produit.volume_propose;
    	    	    	    	    	    						var prix_unitaire = produit.prix_unitaire;
    	    	    	    	    	    						var degre = null;
    	    	    	    	    	    						var top_mercuriale = null;
    	    	    	    	    	    						var millesime = (produit.millesime && (produit.millesime).length > 1)? (produit.millesime).substr((produit.millesime).length - 2, 2) : null;
    	    	    	    	    	    						var vtsgn = null;
    	    	    	    	    	    						if (produit.vtsgn == "VT" || produit.vtsgn == "vt") {
    	    	    	    	    	    							vtsgn = 1;
    	    	    	    	    	    						} 
    	    	    	    	    	    						if (produit.vtsgn == "SGN" || produit.vtsgn == "sgn") {
    	    	    	    	    	    							vtsgn = 2;
    	    	    	    	    	    						} 
    	    	    	    	    	    						var date_circulation = fctGetDateCirculation(produit.retiraisons);
    	    	    	    	    	    						if (!date_circulation) {
    	    	    	    	    	    							date_circulation = doc.valide.validation;
    	    	    	    	    	    						}
    	    	    	    	    	    	    				emit([numero_archive], [numero_archive, numero_cepage, code_cepage, code_appellation, position, volume_propose, volume_enleve, prix_unitaire, degre, top_mercuriale, millesime, vtsgn, date_circulation]);
    	    	    	    	    	    					}
    	    	    	    	    	    				}
    	    	    	    	    	    			}
    	    	    	    	    	    		}
    	    	    	    	    			}
    	    	    	    	    		}    	    	    	    				
    	    	    	    			}
    	    	    	    		}
    	    	    			}
    	    	    		}
    	    			}
    	    		}
    	    	}
    		}
    	}
    }
}