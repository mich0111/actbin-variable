<div style="padding:0px; margin:2px 2px; width:80px; height:80px;" class="cmd #history# container-fluid tooltips cmd-widget" data-type="info" data-version="#version#" data-eqLogic_id="#eqLogic_id#" data-subtype="numeric" data-cmd_id="#id#" data-cmd_uid="#uid#">
	<img class="background#uid#"/>
	<img class="banner#uid#"/>
	<div class="txtban#uid#"/>
	<center>
		<div class="content-sm actbin-widget" style="max-width:50px;max-height:50px;">
			<span class="iconcmd iconcmd#uid#" style="max-width:50px;max-height:50px;"></span>
		</div>
	</center>

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
													// Texte du bandeau ON (optionnel)
			var srcTxtBanOff = ('#txtbanoff#'!='#'+'txtbanoff#') ? '#txtbanoff#': "";
													// Texte du bandeau OFF (optionnel)
			var srcColTxtBanOn = ('#coltxtbanon#'!='#'+'coltxtbanon#') ? '#coltxtbanon#': "";
													// Texte du bandeau ON (optionnel)
			var srcColTxtBanOff = ('#coltxtbanoff#'!='#'+'coltxtbanoff#') ? '#coltxtbanoff#': "";
													// Texte du bandeau OFF (optionnel)
			var srcColBanOn = ('#colbanon#'!='#'+'colbanon#') ? '#colbanon#': "";
													// Couleur du bandeau ON (optionnel)
			var srcColBanOff = ('#colbanoff#'!='#'+'colbanoff#') ? '#colbanoff#': "";
													// Couleur du bandeau OFF (obligatoire)
			var srcTheme = ('#theme#'!='#'+'theme#') ? '#theme#': "";
													// Thème du background (optionnel)
			var srcOnOff = ('#onoff#'!='#'+'theme#') ? '#onoff#': "";
													// Affichage différenciée des images ON et OFF (optionnel)
			var srcBlinkOff = ('#blinkoff#'!='#'+'blinkoff#') ? '#blinkoff#': "";
													// Clignotement du bandeau si OFF (optionnel)
			var srcBlinkOn = ('#blinkon#'!='#'+'blinkon#') ? '#blinkon#': "";
													// Clignotement du bandeau si ON (optionnel)

			// Initialisation des variables
			var fldBkg = 'data/customTemplates/dashboard/cmd.action.other.Multi-action-Defaut/fond/';
													// Dossier des images de background
			var srcIconProp = 'margin=auto text-align=center float=left line-height=50px height=50px width=50px vertical-align=middle';
													// Propriété d'affichage de l'icone
			var srcMode = "light";					// Mode du background (dark ou light)
			var srcColBanner = "";				// Couleur du bandeau
			var srcTxtBanner = "";				// Texte du bandeau
			var srcColTxtBanner = "";			// Couleur des caractères du bandeau
			var srcBlink = "";					// Booléen de clignotement
			var srcErrorCode = "";					// Nom du paramètre en erreur s'il y a lieu
		
			// Validation des paramètres
			if (fldIcon == null || fldIcon == "") {
				srcErrorCode = "folder";
			} else if (srcIcon == null || srcIcon == "") {
				srcErrorCode = "icon";
			}

			if (srcErrorCode != "") {
				// Changement de l'icone pour erreur
				srcIcon = "error";
				// Affichage des éléments d'erreur
				$('.background#uid#').empty().attr('src', fldBkg + 'fo_oups1.png');
				$('.banner#uid#').empty().attr('src', fldBkg + 'fo_banner_red.png');
				$('.cmd[data-cmd_id=#id#] .icon#uid#').hide();
				$('.txtban#uid#').css('color','white');
				$('.txtban#uid#').empty().text(srcErrorCode);
			} else {
				// Sélection du mode clair ou sombre
				if ($('body')[0].hasAttribute('data-theme')) {
					if ($('body').attr('data-theme').endsWith('Light')) {
						srcMode = "light";
					} else {
						srcMode = "dark";
					}
				}

				// Initialisation du nom du dossier des images
				fldIcon = 'data/customTemplates/dashboard/cmd.action.other.Multi-action-Defaut/' + fldIcon + '/';

				if (srcOnOff != 'no' ) {
					srcIconOn = srcIcon + '_on.png';
					srcIconOff = srcIcon + '_off.png';				
				} else {
					srcIconOn = srcIconOff = srcIcon + '.png';
				}
				
				// Initialisation de la couleur du bandeau et des caractères de la valeur
				if (srcState == 0) {
					srcTxtBanner = ((srcTxtBanOff != "") && (srcTxtBanOff != null)) ? srcTxtBanOff : "OFF";
					srcColBanner = ((srcColBanOff != "") && (srcColBanOff != null)) ? srcColBanOff : "red";
					srcColTxtBanner = ((srcColTxtBanOff != "") && (srcColTxtBanOff != null)) ? srcColTxtBanOff : "black";
					srcIcon = (srcOnOff != "no") ? srcIcon + '_off.png' : srcIcon + '.png';
					srcBlink = (srcBlinkOff == "yes") ? srcBlinkOff : "no";
				} else {
					srcTxtBanner = ((srcTxtBanOn != "") && (srcTxtBanOn != null)) ? srcTxtBanOn : "ON";
					srcColBanner = ((srcColBanOn != "") && (srcColBanOn != null)) ? srcColBanOn : "lime";
					srcColTxtBanner = ((srcColTxtBanOn != "") && (srcColTxtBanOn != null)) ? srcColTxtBanOn : "black";
					srcIcon = (srcOnOff != "no") ? srcIcon + '_on.png' : srcIcon + '.png';
					srcBlink = (srcBlinkOn == "yes") ? srcBlinkOn : "no";
				}
				
				// Affichage du background, du bandeau et du nom de la commande
				if (srcTheme != "") {
					srcTheme = srcTheme + '_';
				}
				// Affichage du fond
				$('.background#uid#').empty().attr("src", fldBkg + 'fo_bkg_' + srcTheme + srcMode + '.png');

				// Affichage du bandeau et de ses options
				$('.banner#uid#').css('background-color',srcColBanner);
				if (srcBlink == 'yes') {
					// Clignotement
					$('.banner#uid#').addClass('blinking');
				}
				else {
					$('.banner#uid#').removeClass('blinking');
				}
				$('.banner#uid#').empty().attr("src", fldBkg + 'fo_banner.png');

				// Affichage du texte des bandeaux
				$('.txtban#uid#').css('color',srcColTxtBanner);
				$('.txtban#uid#').empty().text(srcTxtBanner);

				// Affichage de l'icône et de ses options
				if (_options.display_value == '1' || _options.display_value == 1 || _options.display_value == '99' || _options.display_value == 99 || _options.display_value == 'on') {
					if (jeedom.cmd.normalizeName('#name#') == 'on') {
						$('.cmd[data-cmd_id=#id#]').hide();
					} else {
						$('.cmd[data-cmd_id=#id#]').show();
						$('.iconcmd#uid#').empty().append('<img src="'+ fldIcon + srcIcon + '" ' + srcIconProp + '>');
					}
				} else if (jeedom.cmd.normalizeName('#name#') == 'off') {
					$('.cmd[data-cmd_id=#id#]').hide();
				} else {
					$('.cmd[data-cmd_id=#id#]').show();
					$('.iconcmd#uid#').empty().append('<img src="'+ fldIcon + srcIcon + '" ' + srcIconProp + '>');
				}
			}
		}

		jeedom.cmd.update['#id#']({display_value:'#state#',valueDate:'#valueDate#',collectDate:'#collectDate#',alertLevel:'#alertLevel#'});
		$('.iconcmd#uid#').off().on('click', function () {
			jeedom.cmd.execute({id: '#id#'});
		});
	</script>

	<style>
		div.txtban#uid# {
			font-size:1.2em;
			font-weight:bold;
			position:absolute;
			vertical-align:middle;
			top:82%;
			left:0%;
			width:80px;
			height:80px;
			z-index:4;
		}
		div.content-sm.actbin-widget {
			top:5px;
			margin-left:18%;
			max-height:50px;
			max-width:50px;
			position:absolute;
			line-height:50px;
			text-align:center;
			z-index:2;
		}
		.actbin-widget img.iconcmd#uid {
			vertical-align:center;
		}
		img.banner#uid# {
			position:absolute;
			border-radius:0px 0px 6px 6px;
			bottom:0%;
			left:0%;
			width:80px;
			height:16px;
			z-index:2;
		}
		img.background#uid# {
			position:absolute;
			border-radius:0px 0px 6px 6px;
			top:0%;
			left:0%;
			width:80px;
			height:80px;
			z-index:1;
		}
		@keyframes blinking {
			20% {opacity:0;}
			100% {opacity:1;}
		}
		.blinking {animation:blinking infinite 1s;}
	</style>
</div>