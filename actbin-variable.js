<div style="padding:0px; margin:2px 2px; width:85px; height:85px;" class="cmd #history# container-fluid tooltips cmd-widget" data-type="info" data-version="#version#" data-eqLogic_id="#eqLogic_id#" data-subtype="numeric" data-cmd_id="#id#" data-cmd_uid="#uid#">
 	<img class="background#uid#"/>
 	<img class="banner#uid#"/>
	<img class="icon#uid#" style="transform:translate(-50%,-50%);"/>
	<div class="txtban#uid#"/>
 
	<script>
		jeedom.cmd.update['#id#'] = function(_options) {
			// Récupération de srcState
			var srcState = _options.display_value;	// Valeur de l'info binaire

			// Récupération des valeurs des paramètres du widget
 			var fldIcon = ('#folder#'!='#'+'folder#') ? '#folder#' : "";
													// Dossier de l'image à superposer (obligatoire)
 			var srcIcon = ('#icon#'!='#'+'icon#') ? '#icon#' : "";
													// Image à superposer (obligatoire)
			var srcTxtBanOn = ('#txtbanon#'!='#'+'txtbanon#') ? '#txtbanon#': "";
													// Texte du bandeau ON (obligatoire)
			var srcTxtBanOff = ('#txtbanoff#'!='#'+'txtbanoff#') ? '#txtbanoff#': "";
													// Texte du bandeau OFF (obligatoire)
			var srcColBanOn = ('#colbanon#'!='#'+'colbanon#') ? '#colbanon#': "";
													// Couleur du bandeau ON (obligatoire)
			var srcColBanOff = ('#colbanoff#'!='#'+'colbanoff#') ? '#colbanoff#': "";
													// Couleur du bandeau OFF (obligatoire)
			var srcTheme = ('#theme#'!='#'+'theme#') ? '#theme#': "";
													// Thème du background (optionnel)
			var srcOnOff = ('#onoff#'!='#'+'theme#') ? '#onoff#': "";
													// Affichage différenciée des images ON et OFF

			var fldBkg = 'data/customTemplates/dashboard/cmd.action.other.Multi-action-Defaut/fond/';
													// Dossier des images de background
			var srcMode = "light";					// Mode du background (dark ou light)
			var srcColBanner = "";					// Couleur du bandeau
			var srcTxtBanner = "";					// Texte du bandeau
			var srcColTxtBanner = "black";			// Couleur des caractères du bandeau
			var srcMode = "light";					// Mode du background (dark ou light)
			var srcErrorCode = "";					// Nom du paramètre en erreur s'il y a lieu
		
			// Validation des paramètres
			if (fldIcon == null || fldIcon == "") {
				srcErrorCode = "folder";
			} else if (srcIcon == null || srcIcon == "") {
				srcErrorCode = "icon";
			} else if (srcTxtBanOn == null || srcTxtBanOn == "") {
				srcErrorCode = "txtbanon";
			} else if (srcColBanOn == null || srcColBanOn == "") {
				srcErrorCode = "colbanon";
			} else if (srcTxtBanOff == null || srcTxtBanOff == "") {
				srcErrorCode = "txtbanoff";
			} else if (srcColBanOff == null || srcColBanOff == "") {
				srcErrorCode = "colbanoff";
			}
			
			if (srcErrorCode != "") {
				srcIcon = "error";
			} else {
				// Initialisation du nom du dossier des images
				fldIcon = 'data/customTemplates/dashboard/cmd.action.other.Multi-action-Defaut/' + fldIcon + '/';

				// Initialisation de la couleur du bandeau
				if (srcState == 0) {
					srcColBanner = srcColBanOff;
					srcTxtBanner = srcTxtBanOff; 
				} else {
					srcColBanner = srcColBanOn;
					srcTxtBanner = srcTxtBanOn; 
				}

				// Calcul de la couleur des caractères de la valeur de la commande et du bandeau
				switch (srcColBanner) {
					case "aqua":
						srcColTxtBanner = "black";
						break;
					case "blue":
						srcColTxtBanner = "white";
						break;
					case "lime":
						srcColTxtBanner = "white";
						break;
					case "yellow":
						srcColTxtBanner = "black";
						break;
					case "lightsalmon":
						srcColTxtBanner = "black";
						break;
					case "orange":
						srcColTxtBanner = "black";
						break;
					case "darkorange":
						srcColTxtBanner = "white";
						break;
					case "red":
						srcColTxtBanner = "white";
						break;
					case "darkred":
						srcColTxtBanner = "white";
						break;
					case "black":
						srcColTxtBanner = "white";
						break;
					case "gray":
						srcColTxtBanner = "white";
						break;
					defaut:
						srcErrorCode = "?colban?";
						break;
				}
			}
			
			// Sélection du mode clair ou sombre
			if ($('body')[0].hasAttribute('data-theme')) {
				if ($('body').attr('data-theme').endsWith('Light')) {
					srcMode = "light";
				} else {
					srcMode = "dark";
				}
			}

			if (srcErrorCode != "") {
				// Affichage des éléments d'erreur
				$('.background#uid#').empty().attr('src', fldBkg + 'fo_oups1.png');
				$('.banner#uid#').empty().attr('src', fldBkg + 'fo_banner_red.png');
				$('.icon#uid#').hide();
				$('.txtban#uid#').css('color','white');
				$('.txtban#uid#').empty().text(srcErrorCode);
			} else {
				//Affichage du background, du bandeau et du nom de la commande
				if (srcTheme != "") {
					srcTheme = srcTheme + '_';
                }
				// Affichage des images
				$('.background#uid#').empty().attr("src", fldBkg + 'fo_bkg_' + srcTheme + srcMode + '.png');
				$('.banner#uid#').empty().attr("src", fldBkg + 'fo_banner_' + srcColBanner + '.png');
				if (srcOnOff == "yes") {
					if (srcState == 0) {
						$('.icon#uid#').empty().attr('src', fldIcon + srcIcon + '_off.png');
					} else {
						$('.icon#uid#').empty().attr('src', fldIcon + srcIcon + '_on.png');
					}
				}
				 else {
					$('.icon#uid#').empty().attr('src', fldIcon + srcIcon + '.png');
				}
				// Affichage des textes
              	$('.txtban#uid#').css('color',srcColTxtBanner);
				$('.txtban#uid#').empty().text(srcTxtBanner);
			}
			$('.cmd[data-cmd_uid=#uid#]').attr('title','Valeur du '+_options.valueDate+', collectée le '+_options.collectDate);
		}
		jeedom.cmd.update['#id#']({display_value:'#state#',valueDate:'#valueDate#',collectDate:'#collectDate#',alertLevel:'#alertLevel#'});
	</script>

	<style>
		div.txtban#uid# {
			font-size:1.2em;
			font-weight:bold;
			position:absolute;
			vertical-align:middle;
			top:82%;
			left:0%;
			width:85px;
			height:85px;
			z-index:4;
		}
		img.icon#uid# {
			position:absolute;
			margin:0;
			top:47%;
			left:52%;
			max-height:50px;
			max-width:50px;
			z-index:2;
		}
		img.banner#uid# {
			position:absolute;
			top:0%;
			left:0%;
			width:85px;
			height:85px;
			z-index:2;
		}
		img.background#uid# {
			position:absolute;
			top:0%;
			left:0%;
			width:85px;
			height:85px;
			z-index:1;
		}
	</style>
</div>
