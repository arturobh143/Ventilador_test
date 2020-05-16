// Parametros ambientales
let x_par = 50; 
let y_par = 80;
let input1;
let input2;
let input3;
let temp_ambiente;
let pres_ambiente;
let hum_ambiente;
let button1;
let button2;
let is_insert_par;

// Control de velocidad
let x_cont = 540; 
let y_cont = 80; 
let angle1;
let oldAngle1;
let sent1;
let calcAngle1;
let velocidadRPM;
let rz = 35; //Diametro de control de velocidad
let drag1 = false; //Estado del movimiento de perilla velocidad
let drag2 = false; //Estado del movimiento de slide de apertura
let slider;
let ap;

// Modulo de enesayo
let x_mod = 50; //Posición del frame
let y_mod = 300;
let x_mot = 180;//Posición del motor
let y_mot = 50;
let angle_eje;

//Impelente 90
let x_base_90 = x_mod + 250;
let y_base_90 = y_mod + 280;
let x_90;
let y_90;
let is_90_vent;
let is_90_mouse;
let is_90_base;
//Impelente 138
let x_base_138 = x_mod + 100;
let y_base_138 = y_mod + 280;
let x_138;
let y_138;
let is_138_vent;
let is_138_mouse;
let is_138_base;
//Impelente 63
let x_base_63 = x_mod + 400;
let y_base_63 = y_mod + 280;
let x_63;
let y_63;
let is_63_vent;
let is_63_mouse;
let is_63_base;

//Valores para cálculo
let dens_std = 1.185;
let dens;
let vel_real;
let fuerza;
let dp_tob;
let dp_vent;
let vel_3500;
let vel_1800;
let dp_tob_3500;
let dp_tob_1800;
let dp_vent_3500;
let dp_vent_1800;
let F_3500;
let F_1800;
let caudal_3500;
let caudal_1800;
let ghman_3500;
let ghman_1800;
let pot_3500;
let pot_1800;
let caudal;
let ghman;
let pot;
let old_tob;
let old_vent;
let old_F;
let dp_tob_f;
let dp_vent_f;
let fuerza_f;

//Imagenes
let logo_pucp;
let logo_laben;
let ap_0;
let ap_10;
let ap_20;
let ap_30;
let ap_40;
let ap_50;
let ap_60;
let ap_70;
let ap_80;
let ap_90;
let ap_100;

//Datos por horarios
let horarios = ['H6M1', 'H6M2', 'H6M3', 'H6M4', 'H6M5'];
//Error de fuerza -> Absoluto
let err_fuerza = [0.05,0.1,0.2,0.5,0.75];
//Error de dp_tobera -> % de medición
let err_dp_tobera = [0.1,0.2,0.5,1,2];
//Error de dp_vent -> % de medición
let err_dp_vent = [2,1,0.5,0.2,0.1];
//Distribución
let num_hor;
let is_change_hor;


function preload(){
	logo_pucp = loadImage('https://raw.githubusercontent.com/arturobh143/Ventilador_test/gh-pages/logo_pucp.png');
	logo_laben = loadImage('https://raw.githubusercontent.com/arturobh143/Ventilador_test/gh-pages/logo_laben.png');
	ap_0 = loadImage('https://raw.githubusercontent.com/arturobh143/Ventilador_test/gh-pages/0_apertura.PNG');
	ap_10 = loadImage('https://raw.githubusercontent.com/arturobh143/Ventilador_test/gh-pages/10_apertura.PNG');
	ap_20 = loadImage('https://raw.githubusercontent.com/arturobh143/Ventilador_test/gh-pages/20_apertura.PNG');
	ap_30 = loadImage('https://raw.githubusercontent.com/arturobh143/Ventilador_test/gh-pages/30_apertura.PNG');
	ap_40 = loadImage('https://raw.githubusercontent.com/arturobh143/Ventilador_test/gh-pages/40_apertura.PNG');
	ap_50 = loadImage('https://raw.githubusercontent.com/arturobh143/Ventilador_test/gh-pages/50_apertura.PNG');
	ap_60 = loadImage('https://raw.githubusercontent.com/arturobh143/Ventilador_test/gh-pages/60_apertura.PNG');
	ap_70 = loadImage('https://raw.githubusercontent.com/arturobh143/Ventilador_test/gh-pages/70_apertura.PNG');
	ap_80 = loadImage('https://raw.githubusercontent.com/arturobh143/Ventilador_test/gh-pages/80_apertura.PNG');
	ap_90 = loadImage('https://raw.githubusercontent.com/arturobh143/Ventilador_test/gh-pages/90_apertura.PNG');
	ap_100 = loadImage('https://raw.githubusercontent.com/arturobh143/Ventilador_test/gh-pages/100_apertura.PNG');
}

function setup() {
    createCanvas(940, 750);
    //createCanvas(displayWidth, displayHeight);
    textAlign(CENTER, CENTER);
    logo_pucp.resize(150, 50);
    logo_laben.resize(150, 50);
    angleMode(DEGREES);
    // Parámetros ambientales-------------------------------------
	//Inputs de variables ambientales
    input1 = createInput();
    input1.position(x_par + 70, y_par + 63);
    input1.style('width', '120px');
    input2 = createInput();
    input2.position(x_par + 70, y_par + 103);
    input2.style('width', '120px');
    input3 = createInput();
    input3.position(x_par + 70, y_par + 143);
    input3.style('width', '120px');
	//Bóton
    button1 = createButton('Ingresar P.A.');
    button1.position(x_par + 330, y_par + 130);
	button1.size(100,50);
	num_hor = 0;
	button2 = createButton(horarios[num_hor]);
    button2.position(x_par + 330, y_par + 55);
    button2.size(100,50);
	is_change_hor = false;
	is_insert_par = false;
	// Valores iniciales de variables ambientales
    temp_ambiente = 25;
    pres_ambiente = 103;
    hum_ambiente = 85;
    // Control de velocidad------------------------------------------
    angle1 = 135;
    oldAngle1 = 0;
    sent1 = 'AntiHorario';
    calcAngle1 = 0;
    velocidadRPM = 0;
    // Control de apertura--------------------------------------------
    ap = 0;
    slider = createSlider(0,100,0,10);
    slider.position(x_cont+190, y_cont+80);
    slider.style('width', '150px'); 
    // Impelentes---------------------------------------------
    angle_eje = 0;
    // Valores booleanos que indican la posición de los impelentes
    //90°
    is_90_vent = false;
    is_90_mouse = false;
    is_90_base = true;
    //138°
    is_138_vent = false;
    is_138_mouse = false;
    is_138_base = true;
    //63°
    is_63_vent = false;
    is_63_mouse = false;
    is_63_base = true;
    //Valores
    fuerza = 0;
	dp_tob = 0;
	dp_vent = 0;
	fuerza_f = 0;
	dp_tob_f = 0;
	dp_vent_f = 0;
	vel_real = 0;
	vel_3500 = 0;
	vel_1800 = 0;
	dp_tob_3500 = 0;
	dp_tob_1800 = 0;
	dp_vent_3500 = 0;
	dp_vent_1800 = 0;
	F_3500 = 0;
	F_1800 = 0;
	caudal_3500 = 0;
	caudal_1800 = 0;
	ghman_3500 = 0;
	ghman_1800 = 0;
	pot_3500 = 0;
	pot_1800 = 0;
	dens = 0;
	caudal = 0;
	ghman = 0;
	pot = 0;
	old_F = 0;
	old_tob = 0;
	old_vent = 0;
}

function draw(){
	background(220);
    fill(255);
    rect(50, 5, 850, 60);
    fill(0);
    image(logo_pucp, 60, 10);
    image(logo_laben, 740, 10);
	//Parámetros ambientales
	dib_parametros(x_par,y_par);
    //Controles
    dib_controles(x_cont, y_cont);
    //Módulo
    dib_modulo(x_mod,y_mod);
	//Cálculo
	Calcular();
}

function mousePressed() {
	if((mouseX>x_par+330)&&(mouseX<x_par+430)&&(mouseY>y_par+55)&&(mouseY<y_par+105)){
		is_change_hor = true;
	}
	if((mouseX>x_par+330)&&(mouseX<x_par+430)&&(mouseY>y_par+130)&&(mouseY<y_par+180)){
		is_insert_par = true;
	}
    //Perilla de velocidad
    if (dist(mouseX, mouseY, x_cont + 80, y_cont + 80) < rz) {
        drag1 = true;
    }
    if(dist(mouseX,mouseY,x_mod+x_mot+160 + 30, y_mod + 60+y_mot)<45){
      if(is_90_vent){
        is_90_vent = false;
        is_90_mouse = true;
      } else if(is_138_vent){
        is_138_vent = false;
        is_138_mouse = true;
      } else if(is_63_vent){
        is_63_vent = false;
        is_63_mouse = true;
      }
    }
    if(dist(mouseX,mouseY,x_base_90, y_base_90)<45){
      if(is_90_base){
        is_90_base = false;
        is_90_mouse = true;
      } 
    }
    if(dist(mouseX,mouseY,x_base_138, y_base_138)<45){
      if(is_138_base){
        is_138_base = false;
        is_138_mouse = true;
      } 
    }
    if(dist(mouseX,mouseY,x_base_63, y_base_63)<45){
      if(is_63_base){
        is_63_base = false;
        is_63_mouse = true;
      } 
    }
}

function mouseReleased() {
	if(is_change_hor){
		is_change_hor = false;
		if(num_hor==4){
			num_hor=0;
		}else{
			num_hor = num_hor+1;
		}
		button2.html(horarios[num_hor]);
	}
	if(is_insert_par){
		is_insert_par = false;
		iv1 = input1.value();
		iv2 = input2.value();
		iv3 = input3.value();
		if (iv1 > -10 && iv1 < 35 && iv1 != '') {
			temp_ambiente = input1.value(); //Temperatura
		}
		if (iv2 > 80 && iv2 < 120 && iv2 != '') {
			pres_ambiente = input2.value(); //Presión
		}
		if (iv3 > 60 && iv3 < 101 && iv3 != '') {
			hum_ambiente = input3.value(); //Humedad
		}
		input1.value('');
		input2.value('');
		input3.value('');
	}
    drag1 = false;
    if(dist(mouseX,mouseY,x_mod+x_mot+160 + 30, y_mod + 60+y_mot)<45){
      if(is_90_mouse){
        is_90_vent = true;
        is_90_mouse = false;
        is_138_base = true;
        is_63_base = true;
        is_138_vent = false;
        is_63_vent = false;
      } else if(is_138_mouse){
        is_138_vent = true;
        is_138_mouse = false;
        is_90_base = true;
        is_63_base = true;
        is_90_vent = false;
        is_63_vent = false;
      } else if(is_63_mouse){
        is_63_vent = true;
        is_63_mouse = false;
        is_138_base = true;
        is_90_base = true;
        is_138_vent = false;
        is_90_vent = false;
      }
    } else{
      if(is_90_mouse){
        is_90_base = true;
        is_90_mouse = false;
      } else if(is_138_mouse){
        is_138_base = true;
        is_138_mouse = false;
      } else if(is_63_mouse){
        is_63_base = true;
        is_63_mouse = false;
      }
    }
}

function dib_parametros(x1, y1){
	fill(250);
    strokeWeight(1);
    rect(x1, y1, 470, 200);
    line(x1 + 280, y1 + 10, x1 + 280, y1 + 120);
	line(x1 + 280, y1 + 120, x1 + 460, y1 + 120);
    // Texto
    fill('black');
    textStyle(BOLD);
    textSize(14);
    text('PARÁMETROS ', x1 + 150 , y1 + 20);
    text('AMBIENTALES ', x1 + 150 , y1 + 40);
    text('SELECCIONAR ', x1 + 380, y1 + 20);
    text('HORARIO ', x1 + 380, y1 + 40);


    // Etiquetas
    fill(0);
    textStyle(BOLD);
    rect(x1 + 20, y1 + 60, 30, 30);
    rect(x1 + 20, y1 + 100, 30, 30);
    rect(x1 + 20, y1 + 140, 30, 30);

    textSize(14);
    fill(0, 255, 0);
    text('Ta', x1 + 35, y1 + 75); //Temperatura ambiental
    text('Pa', x1 + 35, y1 + 115); //presion
    text('Ha', x1 + 35, y1 + 155); //Humedad
	
	// Unidades
    fill(0);

    text('°C', input1.x + input1.width + 60, input1.y + 12);
    text('kPa', input2.x + input2.width + 60, input2.y + 12);
    text('% HR', input3.x + input3.width + 60, input3.y + 12);

    text(temp_ambiente, input1.x + input1.width + 25, input1.y + 12);
    text(pres_ambiente, input2.x + input2.width + 25, input2.y + 12);
    text(hum_ambiente, input3.x + input3.width + 25, input3.y + 12);
	fill(0);
    textSize(12);
}

function dib_controles(x2,y2) {
    fill(250);
    strokeWeight(1);
    rect(x2, y2, 360, 200);
    // Texto
    fill('black');
    textStyle(BOLD);
    textSize(14);
    text('CONTROLES', x2 + 380 / 2, y2 + 20);
  
    fill(0);
    rect(x2 + 40, y2 + 95 + rz + 30, 80, 30);
    rect(x2 + 240, y2 + 95 + rz + 30, 80, 30);

    textSize(12);
    text('VELOCIDAD DE MOTOR', x2 + 80, y2 + 80 + rz + 30);
    text('APERTURA', x2 + 280, y2 + 80 + rz + 30);
  
    // Control de velocidad
    fill('black');
    //Lineas gruesas
    push();
    var i;
    translate(x2 + 80, y2 + 80);
    rotate(135);
    strokeWeight(2);
    line(0, 0, 50, 0);
    for(i = 1; i < 4; i++){
      rotate(90);
      strokeWeight(2);
      line(0, 0, 50, 0);
    }
    pop();
    //Lineas delgadas
    push();
    var i;
    translate(x2 + 80, y2 + 80);
    rotate(180);
    strokeWeight(1);
    line(0, 0, 45, 0);
    for(i = 1; i < 3 ; i++){
      rotate(90);
      strokeWeight(1);
      line(0, 0, 45, 0);
    }
    pop();
    //Circulo
    fill(110);
    strokeWeight(3);
    ellipse(x2 + 80, y2 + 80, rz * 2, rz * 2);
    // Logica de movimiento de indicador
    if(drag1){
        dx1 = mouseX - (x2+80);
        dy1 = mouseY - (y2+80);
        angle1 = atan2(dy1,dx1);
        if(oldAngle1>angle1){
          sent1 = 'Horario';
        } else{
          sent1 = 'AntiHorario';
        }
        fill(0,153,0);
    } else{
        fill(255);
    }
    //Dibujar indicador
    if (angle1 >= 135 && angle1 <= 180){ //Entre 1000 y 1500 RPM
        calcAngle1 = map(angle1,135,180,1000,1500);
    } else if(angle1 <= 0 && angle1 >= -180){ //Entre 1500 y 3500 RPM
        calcAngle1 = map(angle1,-180,0,1500,3500);
    } else if(angle1 >= 0 && angle1 <= 45){ //Entre 3500 y 4000 RPM
        calcAngle1 = map(angle1,0,45,3500,4000);
    } else if(angle1 > 45 && angle1 < 135){ //Zona no valida
        if(sent1 == 'Horario'){
            angle1 = 135;
            calcAngle1 = 1000;
        } else if(sent1 == 'AntiHorario'){
            angle1 = 45;
            calcAngle1 = 4000;
        }
    }
    //Dibujo de bola
    push();
    translate(x2+80,y2+80);
    rotate(angle1);
    ellipse(rz-15,0,10,10);
    pop();
    //Dibujo indicador
    fill(0);
    oldAngle1 = angle1;
    textAlign(CENTER);
    velocidadRPM = int(calcAngle1);
    fill(0, 255, 0);
    textSize(14);
    text(velocidadRPM, x2 + 60, y2 + 110 + rz + 30);
    text('RPM', x2 + 100, y2 + 110 + rz + 30);
    //Texto marcadores
    fill('black'); 
    textSize(12);
    textStyle(NORMAL);
    text('1000', x2 + 80 + 65 * cos(135), y2 + 80 + 65 * sin(135));
    text('2000', x2 + 80 + 65 * cos(225), y2 + 80 + 65 * sin(225));
    text('3000', x2 + 80 + 65 * cos(315), y2 + 80 + 65 * sin(315));
    text('4000', x2 + 80 + 65 * cos(45), y2 + 80 + 65 * sin(45));
    //Valor de apertura
    fill(0);
    textAlign(CENTER);
    ap = slider.value();
    fill(0, 255, 0);
    textSize(14);
    text(ap, x2 + 270, y2 + 110 + rz + 30);
    text('%', x2 + 300, y2 + 110 + rz + 30);
}

function dib_modulo(x3,y3){
    //Fondo blanco
    fill(255);
    strokeWeight(2);
    rect(x3,y3,850,400);
    //Celda de carga
    fill(100);
    rect(x3 + x_mot - 65, y3 + 55+y_mot, 10, 50); //Celda de carga
    rect(x3 + x_mot - 75, y3 + 55+y_mot, 60, 10);
    fill(255);
    ellipse(x3 + x_mot - 60, y3 +y_mot + 60, 7, 7);
    fill(50);
    rect(x3 + x_mot - 70, y3 +y_mot + 90, 20, 20);
    fill(0);
    textStyle(BOLD);
    textSize(14);
    text('CELDA DE', x3 +x_mot-120, y3 + y_mot+80);
    text('CARGA', x3 +x_mot-120, y3 + y_mot+100);
    fill(0);
    rect(x3 +x_mot-120, y3+y_mot , 80, 30);
    textAlign(CENTER);
    fill(0, 255, 0);
    textSize(14);
    text(round(fuerza_f,2), x3 +x_mot-90 , y3 + y_mot+20);
    text('N', x3 +x_mot-60, y3 + y_mot+20);
    //Motor
    fill(0, 76, 153);
    rect(x3+x_mot, y3 + y_mot, 60, 30);
    rect(x3-20+x_mot, y3 + 100+y_mot, 100, 15);
    ellipse(x3+x_mot + 30, y3 + 60+y_mot, 105, 105); //Exterior del motor
    fill(0);
    ellipse(x3+x_mot + 30, y3 + 60+y_mot, 20, 20); //Eje
    fill(0);
    textStyle(BOLD);
    textSize(14);
    text('MOTOR', x3+x_mot+30 , y3+y_mot+130 );
    text('ELÉCTRICO', x3 +x_mot+30, y3+y_mot+150 );
    //Ventilador
    fill(0, 76, 153);
    rect(x3+x_mot+190, y3+y_mot-40, 50, 100);
    rect(x3-20+x_mot+160, y3 + 100+y_mot, 100, 15);
    ellipse(x3+x_mot+160 + 30, y3 + 60+y_mot, 105, 105); //Exterior del motor
    fill(0);
    ellipse(x3+x_mot+160 + 30, y3 + 60+y_mot, 20, 20); //Eje
    fill(0);
    textStyle(BOLD);
    textSize(14);
    text('VENTILADOR', x3+x_mot+190 , y3+y_mot+130 );
    text('CENTRÍFUGO', x3 +x_mot+190, y3+y_mot+150 );
	
    //Impelente en ventilador ------------------------
    fill(100);
    push();
    var i;
    translate(x3+x_mot+160 + 30, y3 + 60+y_mot);
    rotate(-angle_eje);
    if(is_90_vent){
      ellipse(0,0, 90, 90);
      rect(0,-3,45,6);
      for(i=1;i < 8;i++){
        rotate(-45);
        rect(0,-3,45,6);
      }
      ellipse(0,0,50,50);
    } else if(is_138_vent){
      ellipse(0,0, 90, 90);     
      curve(0,0,5*cos(10),5*sin(10),45*cos(10),45*sin(10),100*cos(-50),100*sin(-50));
      for(i=1;i < 16;i++){
        rotate(-22.5);                 
        curve(0,0,5*cos(10),5*sin(10),45*cos(10),45*sin(10),100*cos(-50),100*sin(-50));
      }
      ellipse(0,0,60,60);
    } else if(is_63_vent){
      ellipse(0,0, 90, 90);     
      curve(0,0,5*cos(-10),5*sin(-10),45*cos(-10),45*sin(-10),100*cos(50),100*sin(50));
      for(i=1;i < 12;i++){
        rotate(-30);                 
        curve(0,0,5*cos(-10),5*sin(-10),45*cos(-10),45*sin(-10),100*cos(50),100*sin(50));
      }
      ellipse(0,0,40,40);
    }
    fill(0);
    ellipse(0,0,20,20);
    pop();
  
    //Impelente en base ------------------------
    fill(100);
    if(is_90_base){
      push();
      translate(x_base_90,y_base_90);
      ellipse(0,0,90,90);
      rect(0,-3,45,6);
      for(i=1;i < 8;i++){
        rotate(-45);
        rect(0,-3,45,6);
      }
      ellipse(0,0,50,50);
      pop();
    }
    if(is_138_base){
      push();
      translate(x_base_138,y_base_138);
      ellipse(0,0, 90, 90);     
      curve(0,0,5*cos(10),5*sin(10),45*cos(10),45*sin(10),100*cos(-50),100*sin(-50));
      for(i=1;i < 16;i++){
        rotate(-22.5);                 
        curve(0,0,5*cos(10),5*sin(10),45*cos(10),45*sin(10),100*cos(-50),100*sin(-50));
        }
      ellipse(0,0,60,60);
      pop();
    }
    if(is_63_base){
      push();
      translate(x_base_63,y_base_63);
      ellipse(0,0, 90, 90);     
      curve(0,0,5*cos(-10),5*sin(-10),45*cos(-10),45*sin(-10),100*cos(50),100*sin(50));
      for(i=1;i < 12;i++){
        rotate(-30);                 
        curve(0,0,5*cos(-10),5*sin(-10),45*cos(-10),45*sin(-10),100*cos(50),100*sin(50));
      }
      ellipse(0,0,40,40);
      pop();
    }
    textAlign(CENTER);
    fill(0);
    textStyle(BOLD);
    textSize(14);
    text('IMPELENTE', x_base_138 , y_base_138+60 );
    text('B2 = 138.5°', x_base_138 , y_base_138+80 );
    text('IMPELENTE', x_base_90 , y_base_90+60 );
    text('B2 = 90°', x_base_90 , y_base_90+80 );
    text('IMPELENTE', x_base_63 , y_base_63+60 );
    text('B2 = 63.5°', x_base_63 , y_base_63+80 );

    //Impelente en mouse-------------------------
    fill(100);
    if(is_90_mouse){
      push();
      translate(mouseX,mouseY);
      ellipse(0,0,90,90);
      rect(0,-3,45,6);
      for(i=1;i < 8;i++){
        rotate(-45);
        rect(0,-3,45,6);
      }
      ellipse(0,0,50,50);
      pop();
    }
    if(is_138_mouse){
      push();
      translate(mouseX,mouseY);
      ellipse(0,0, 90, 90);     
      curve(0,0,5*cos(10),5*sin(10),45*cos(10),45*sin(10),100*cos(-50),100*sin(-50));
      for(i=1;i < 16;i++){
        rotate(-22.5);                 
        curve(0,0,5*cos(10),5*sin(10),45*cos(10),45*sin(10),100*cos(-50),100*sin(-50));
        }
      ellipse(0,0,60,60);
      pop();
    }
    if(is_63_mouse){
      push();
      translate(mouseX,mouseY);
      ellipse(0,0, 90, 90);     
      curve(0,0,5*cos(-10),5*sin(-10),45*cos(-10),45*sin(-10),100*cos(50),100*sin(50));
      for(i=1;i < 12;i++){
        rotate(-30);                 
        curve(0,0,5*cos(-10),5*sin(-10),45*cos(-10),45*sin(-10),100*cos(50),100*sin(50));
      }
      ellipse(0,0,40,40);
      pop();
    }
  
    //Faja
    push();
    translate(x3 +x_mot + 30, y3 + y_mot + 50);
    line(0, 0, 160, 1);
    pop();
    push();
    translate(x3 +x_mot + 30, y3 + y_mot + 70);
    line(0, 0, 160, 1);
    pop();
    angle_eje = angle_eje + map(velocidadRPM,1000,4000,5,15);
    
	//Vista isometrica
	switch(ap){
		case 0:
			image(ap_0,x_mod+480,y_mod+10,360,380,250,60,500,470);
			break;
		case 10:
			image(ap_10,x_mod+480,y_mod+10,360,380,250,60,500,470);
			break;
		case 20:
			image(ap_20,x_mod+480,y_mod+10,360,380,250,60,500,470);
			break;	
		case 30:
			image(ap_30,x_mod+480,y_mod+10,360,380,250,60,500,470);
			break;
		case 40:
			image(ap_40,x_mod+480,y_mod+10,360,380,250,60,500,470);
			break;	
		case 50:
			image(ap_50,x_mod+480,y_mod+10,360,380,250,60,500,470);
			break;	
		case 60:
			image(ap_60,x_mod+480,y_mod+10,360,380,250,60,500,470);
			break;
		case 70:
			image(ap_70,x_mod+480,y_mod+10,360,380,250,60,500,470);
			break;
		case 80:
			image(ap_80,x_mod+480,y_mod+10,360,380,250,60,500,470);
			break;
		case 90:
			image(ap_90,x_mod+480,y_mod+10,360,380,250,60,500,470);
			break;
		case 100:
			image(ap_100,x_mod+480,y_mod+10,360,380,250,60,500,470);
			break;
	}
	//Velocidad real
	fill(0);
	textStyle(BOLD);
    textSize(14);
    text('VELOCIDAD', x3+x_mot+295 , y3+y_mot+25 );
    text('REAL', x3 +x_mot+295, y3+y_mot+45 );
    rect(x3 +x_mot+250, y3+y_mot+60 , 80, 30);
    textAlign(CENTER);
    fill(0, 255, 0);
    textSize(14);
    text(round(vel_real,0), x3 +x_mot+270 , y3 + y_mot+80);
    text('RPM', x3 +x_mot+310, y3 + y_mot+80);

	// TOBERA
	fill(0);
	rect(x3 +510, y3+180 , 75, 30);
    textAlign(CENTER);
    fill(0, 255, 0);
    textSize(14);
    text(round(dp_tob_f,2), x3 +540 , y3 + 200);
    text('Pa', x3 +575, y3 + 200);
	//VENT
	fill(0);
	rect(x3 +665, y3+320 , 85, 30);
    textAlign(CENTER);
    fill(0, 255, 0);
    textSize(14);
    text(round(dp_vent_f,2), x3 +705 , y3 + 340);
    text('Pa', x3 +740, y3 + 340);
}
function Calcular(){
	if(is_90_vent){
		//Valores base en 3500
		vel_3500 = (9/100000)*(ap**3)+ 0.0093*(ap**2)- 1.2003*ap + 3549.6;
		dp_tob_3500=-((16/10000)*(ap**3))+(0.4838*(ap**2))+(2.2782*ap)-7.5816;
		if (dp_tob_3500<0 || ap==0){
			dp_tob_3500 = 0;
		}
		dp_vent_3500 = 0.002*(ap**3)-0.3786*(ap**2)+13.347*ap + 1279;
		F_3500 = (8/1000000)*(ap**3)-0.0011*(ap**2)+0.1092*ap + 3.6871;
		
		//Valores base en 1800
		vel_1800 = (4/1000000)*(ap**3)-0.0003*(ap**2)-0.0483*ap + 1795;
		dp_tob_1800 =-0.0009*(ap**3)+0.1941*(ap**2)-2.5002*ap+5.5821;
		if (dp_tob_1800<0 || ap==0){
			dp_tob_1800 = 0;
		}
		dp_vent_1800= 0.0004*(ap**3)-0.0933*(ap**2)+4.497*ap+237.79;
		F_1800= (-3/1000000)*(ap**3)+0.0004*(ap**2)+0.0014*ap + 1.9234;
	} else if(is_138_vent){
		//Valores base en 3500
		vel_3500 = 0.0001*(ap**3)- 0.031*(ap**2)- 0.4426*ap + 3540.2;
		dp_tob_3500 = -0.0014*(ap**3)+ 0.6178*(ap**2)- 0.9685*ap + 67.284;
		if (dp_tob_3500<0 || ap==0){
			dp_tob_3500 = 0;
		}
		dp_vent_3500 = 0.0007*(ap**3)-0.2201*(ap**2)+12.684*ap + 1360.2;
		F_3500 = (-2/1000000)*(ap**3)+0.0009*(ap**2)+0.0645*ap + 4.5171;
		
		//Valores base en 1800
		vel_1800 = (4/1000000)*(ap**3)-0.0008*(ap**2)- 0.034*ap + 1794.3;
		dp_tob_1800 =(0.0013*(ap**3))-0.0484*(ap**2)+6.0591*ap + 21.26;
		if (dp_tob_1800<0 || ap==0){
			dp_tob_1800 = 0;
		}
		dp_vent_1800 = 0.0004*(ap**3)-0.0899*(ap**2)+4.5572*ap + 306.35;
		F_1800 = ((4/10000000)*(ap**3))+ 0.0001*(ap**2)+0.0224*ap + 2.0888;
	} else if(is_63_vent){
		//Valores base en 3500
		vel_3500 = (7/100000)*(ap**3)-0.0059*(ap**2)-0.6297*ap + 3557.6;
		dp_tob_3500 =-0.0045*(ap**3)+0.8025*(ap**2)-9.088*ap+28.253;
		if (dp_tob_3500<0 || ap==0){
			dp_tob_3500 = 0;
		}
		dp_vent_3500 = 0.0014*(ap**3)-0.3013*(ap**2)+10.974*ap+1104.8;
		F_3500 = (-2/1000000)*(ap**3)-(9/100000)*(ap**2)+0.068*ap + 3.0176;
		
		//Valores base en 1800
		vel_1800 = -(1/100000)*(ap**3)+0.0019*(ap**2)-0.1165*ap + 1795.1;
		dp_tob_1800 =-0.0012*(ap**3)+0.2146*(ap**2)-2.8915*ap+7.033;
		if (dp_tob_1800<0 || ap==0){
			dp_tob_1800 = 0;
		}
		dp_vent_1800 = 0.0004*(ap**3)-0.0741*(ap**2)+2.714*ap+275.77;
		F_1800 = (-2/1000000)*(ap**3)+0.0002*(ap**2)+0.0104*ap + 1.8272;
	} 
	if((!is_138_vent)&&(!is_90_vent)&&(!is_63_vent)){
		dp_tob = 0;
		dp_vent = 0;
		fuerza = 0;
		vel_real = 0;
	} else {
		//valores calculados base
		caudal_3500 = 0.96*4.42*(1/1000)*(((2*dp_tob_3500)/dens_std)**(1/2));
		caudal_1800 = 0.96*4.42*(1/1000)*(((2*dp_tob_1800)/dens_std)**(1/2));
		ghman_3500 = dp_vent_3500/dens_std;
		ghman_1800 = dp_vent_1800/dens_std;
		pot_3500 = 0.9*PI*F_3500*0.179*vel_3500/30;
		pot_1800 = 0.9*PI*F_1800*0.179*vel_1800/30;
		dens = pres_ambiente/(0.287*(temp_ambiente+273));
		//vel_real = vel_3500;
		//vel_real = vel_1800;
		vel_real = ((abs(velocidadRPM-vel_1800)*vel_3500*velocidadRPM/3500)+(abs(velocidadRPM-vel_3500)*vel_1800*velocidadRPM/1800))/((abs(velocidadRPM-vel_1800))+(abs(velocidadRPM-vel_3500)));
		caudal = ((abs(vel_real-vel_1800)*(vel_real/vel_3500)*caudal_3500)+(abs(vel_real-vel_3500)*(vel_real/vel_1800)*caudal_1800))/((abs(vel_real-vel_1800))+(abs(vel_real-vel_3500)));
		ghman = ((abs(vel_real-vel_1800)*((vel_real**2)/(vel_3500**2))*ghman_3500)+(abs(vel_real-vel_3500)*((vel_real**2)/(vel_1800**2))*ghman_1800))/((abs(vel_real-vel_1800))+(abs(vel_real-vel_3500)));
		pot = (dens/dens_std)*((abs(vel_real-vel_1800)*((vel_real**3)/(vel_3500**3))*pot_3500)+(abs(vel_real-vel_3500)*((vel_real**3)/(vel_1800**3))*pot_1800))/((abs(vel_real-vel_1800))+(abs(vel_real-vel_3500)));
		dp_tob = (dens/2)*((caudal/(0.96*4.42/1000))**(2));
		if(old_tob == dp_tob){
		} else{
			dp_tob_f = dp_tob + (dp_tob*Math.random()*err_dp_tobera[num_hor]/100) - (dp_tob*Math.random()*err_dp_tobera[num_hor]/100);
		} 
		old_tob = dp_tob;
		//dp_tob = dp_tob_1800;
		//dp_tob = dp_tob_3500;
		dp_vent = ghman*dens;
		if(old_vent == dp_vent){
		} else{
			dp_vent_f = dp_vent + (dp_vent*Math.random()*err_dp_vent[num_hor]/100) - (dp_vent*Math.random()*err_dp_vent[num_hor]/100);
		}
		old_vent = dp_vent
		//dp_vent = dp_vent_1800;
		//dp_vent = dp_vent_3500;
		fuerza = pot*30/(0.9*PI*0.179*vel_real);
		if(old_F == fuerza){
		} else{
			fuerza_f = fuerza + (Math.random()*err_fuerza[num_hor]) - (Math.random()*err_fuerza[num_hor]); 
		}
		old_F = fuerza;
		//fuerza = F_1800;
		//fuerza = F_3500;
	}

}
