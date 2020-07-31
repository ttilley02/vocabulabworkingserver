BEGIN;

TRUNCATE
  vocabulab_notes,
  vocabulab_cards,
  vocabulab_users
  RESTART IDENTITY CASCADE;


INSERT INTO vocabulab_users(user_name, full_name, nickname, password)
VALUES
('testperson1', 'test person1', null , 'password1'),
('testperson2', 'test person2', null , 'password2'),
('testperson3', 'test person3', null , 'password3');

INSERT INTO vocabulab_cards (spa_content, eng_content, difficulty)
VALUES
('La pluma','The pen (feminine)','b'),
('El cuaderno','The notebook (masculine)','b'),
('La escuela','The school (singular)','b'),
('Las escuelas','The schools (plural)','b'),
('El árbol','The tree (singular)','b'),
('Los árboles','The trees (plural)','b'),
('anotaciones (f)','notes','b'),
('calendario (m)','calendar','b'),
('cartera (f)','wallet','b'),
('cepillo (m)','brush','b'),
('cuaderno (m)','notebook','b'),
('dinero (m)','money','b'),
('escritorio (m)','desk','b'),
('grapadora (f)','stapler','b'),
('lámpara (f) (m)','lamp','b'),
('lápiz (m)','pencil','b'),
('libro (m)','book','b'),
('llave (f)','key','b'),
('mochila (f)','backpack','b'),
('papel (m)','paper','b'),
('paraguas (m)','umbrella','b'),
('periódico (m)','newspaper','b'),
('reloj (m)','watch','b'),
('silla (f)','chair','b'),
('tarjeta de identificación (f)','ID card','b'),
('teléfono móbil, portátil, celular (m)','mobile, portable, cell phone','b'),
('tijeras (f)','scissors','b'),
('tiza (f)','chalk','b'),
('Tengo dos lápices y una pluma en mi mochila.','I have two pencils and a pen in my backpack','b'),
('¿Cuántas sillas hay en este salón de clase?','How many chairs are there in this classroom?','b'),
('Ella no tiene su libro de texto hoy.','She doesn''t have her textbook today','b'),
('Me gusta tu teléfono celular.','I like your cellphone.','b'),
('Los profesores tienen que comprar la tiza.','The professors have to buy the chalk','b'),
('cinco casas','five houses','b'),
('diez niños','ten children','b'),
('dos amigos','two friends','b'),
('una noche','one night','b'),
('uno','one','b'),
('dos','two','b'),
('tres','three','b'),
('cuatro','four','b'),
('cinco','five','b'),
('seis','six','b'),
('siete','seven','b'),
('ocho','eight','b'),
('nueve','nine','b'),
('diez','ten','b'),
('cero','zero','b'),
('veinte','twenty','b'),
('treinta','thirty','b'),
('cuarenta','forty','b'),
('cincuenta','fifty','b'),
('sesenta','sixty','b'),
('setenta','seventy','b'),
('ochenta','eighty','b'),
('noventa','ninety','b'),
('cien','one-hundred','b'),
('contar','to count','b'),
('Mi hermanito tiene cinco años.','My little brother is five years old','b'),
('Sólo fui a dos clases hoy.','I only went to two classes today.','b'),
('Ella compró nueve peces para su acuario nuevo.','	She bought nine fish for her new aquarium.','b'),
('Seis de sus ocho primos viven en Brasil.','Six of his/her eight cousins live in Brazil.','b'),
('Hay siete días en una semana.','There are seven days in a week.','b'),
('el gato negro','the black cat','b'),
('los gatos negros.','the black cats','b'),
('la pared azul','the blue wall','b'),
('las paredes azules','the blue walls','b'),
('la casa azul clara','the light blue house','b'),
('las casas azul claras','the light blue houses','b'),
('amarillo (adj)','yellow','b'),
('anaranjado (adj)','orange','b'),
('arco iris (m)','rainbow','b'),
('azul (adj)','blue','b'),
('blanco (adj)','white','b'),
('claro (adj)','light (as in light blue)','b'),
('colorado (adj)','red','b'),
('dorado (adj)','golden','b'),
('durazno (adj)','peach-colored','b'),
('gris (adj)','grey','b'),
('marrón (adj)','brown','b'),
('morado (adj)','purple','b'),
('negro (adj)','black','b'),
('oscuro (adj)','dark','b'),
('plateado (adj)','silver','b'),
('rojo (adj)','red','b'),
('rosado (adj)','pink','b'),
('verde (adj)','green','b'),
('violeta (adj)','violet','b'),
('Me gustan los automóviles amarillos.','I like yellow cars.','b'),
('La casa verde es una gran novela de Vargas Llosa.','The Green House is a great novel of Vargas Llosa.','b'),
('El cielo es de un azul muy claro en la playa.','The sky is a very light blue at the beach.','b'),
('Necesito mi cuaderno negro.','I need my black notebook','b'),
('Mi amiga(o) se puso roja.','My friend turned red.','b'),
('Tres y dos son cinco','Three and two are five','b'),
('Tres más dos son cinc','Three plus two are five','b'),
('Nueve menos tres son seis','Nine minus three are six','b'),
('Dos por cuatro son ocho','Two times four are eight','b'),
('Dos veces cuatro son ocho','Two times four are eight','b'),
('Diez entre dos son cinco','Ten divided by two are five','b'),
('alfabeto (m)','alphabet','b'),
('dividir','to divide','b'),
('entre','divided by','b'),
('más','plus','b'),
('menos','minus','b'),
('multiplicar','to multiply','b'),
('por','times (multiplication)','b'),
('ser igual a','to be equal to','b'),
('sumar','to add','b'),
('veces','times (multiplication)','b'),
('y','plus/and','b'),
('Siempre me llamas en esta hora.','You always call me at this time','i'),
('No me llames en esta hora.','Don''t call me at this time (of day).','i'),
('No tienes que decirle la verdad','You don''t have to tell him/her the truth.','i'),
('Dile que el partido empieza a las siete.','Tell him/her that the game starts at seven.','i'),
('me','me / to me','i'),
('te','you / to you','i'),
('le','him, to him/her, to her/you, to you','i'),
('nos','us / to us','i'),
('os','you all / to you all','i'),
('les','them, to them, you all, to you all','i'),
('Oye, Juan, te quiero presentar a una amiga.','Hey, Juan, I want to introduce you to a friend.','i'),
('Juan, te presento a Sasha.','Juan, this is Sasha.','i'),
('Hola Juan, ¿Qué tal?','Hi Juan, how are you?','i'),
('Ya me despido, es que tengo que trabajar en la mañana.','I''ve got to say goodbye, I have to work tomorrow morning.','i'),
('Bueno, hasta luego, que te cuides.','OK, see you later, take care.','i'),
('¿En un ambiente de negocios se saluda de beso o un apretón de mano?','In a business situation do you greet people with a kiss on the cheek or a handshake?','i'),
('A muchos extranjeros les parece raro saludar de beso.','To many foreigners it seems strange to greet with a kiss.','i'),
('¿Qué pasó Víctor? ¿Qué cuentas?','What''s up Victor? What''s new?','i'),
('¿Ya conociste a mi hermano, Roberto?','Did you already meet my brother, Robert?','i'),
('Me dio mucho gusto conocerlos.','It was nice to meet you all.','i'),
('abrazar','to hug, to hold','i'),
('apretón de mano (m)','handshake','i'),
('beso (m)','kiss','i'),
('¿Cómo te va?','How''s it going?','i'),
('con permiso','excuse me','i'),
('conocer','1. to meet 2. to know 3. to be familiar with','i'),
('despedirse','to say goodbye','i'),
('encantado (m)','pleased to meet you','i'),
('hasta luego','see you later','i'),
('mucho gusto','it''s nice to meet you / ','i'),
('presentarse','to introduce oneself','i'),
('¿Qué pasa? ¿Qué pasó?','What''s up?','i'),
('Que te vaya bien','Have a good one.','i'),
('¿Qué tal?','How are you?','i'),
('saludar','to greet/ to say hello/ to wave','i'),
('Es la una.','It is 1:00','i'),
('Es la una y quince.','It is 1:15.','i'),
('Es la una y media.','It is 1:30.','i'),
('Son las dos menos quince.','It is 1:45.','i'),
('Son las dos.','It is 2:00.','i'),
('Son las tres.','It is 3:00','i'),
('Son las diez de la mañana.','It is 10:00 in the morning.','i'),
('Son las seis de la tarde.','t is 6:00 in the afternoon.','i'),
('Son las ocho de la noche.','It is 8:00 in the evening.','i'),
('Es mediodía.','It is noon.','i'),
('Es medianoche.','It is midnight.','i'),
('¿Qué hora es?','What time is it?','i'),
('Son las cuatro de la tarde.','It is four in the afternoon.','i'),
('¿Qué hora era?','What time was it?','i'),
('¿Cuándo era?','When was it?','i'),
('Eran las cinco de la tarde.','It was five in the afternoon.','i'),
('¿A qué hora es la cita?','When is the appointment?','i'),
('La cita es al mediodía.','The appointment is at noon.','i'),
('¿A qué hora salió él?','What time did he leave?','i'),
('¿Cuándo salió él?','When did he leave?','i'),
('Él salió a las ocho.','He left at 8:00am','i'),
('ahora (adv)','now','i'),
('ahorita (adv)','now (informal word very common in Mexico)','i'),
('alarma (f)','alarm','i'),
('alarmar','to alarm','i'),
('antes (adv)','before','i'),
('casi (adv)','almost','i'),
('despertador (m)','alarm clock','i'),
('después (adv)','after','i'),
('¿Me da la hora?','Can you give me the time?','i'),
('poco (m)','few, little','i'),
('poquito (m)','few or little (informal word very common in Mexico)','i'),
('¿Qué hora es?','What time is it?','i'),
('reloj (m)','watch','i'),
('reloj de pared (m)','clock','i'),
('timbre (m)','door bell, ringer','i'),
('Falta un cuarto para las seis. / Son las seis menos cuarto.','It''s quarter to six. / Its 5:45.','i'),
('Son las tres y media.','It''s three thirty.','i'),
('¿Qué horas son? / ¿Qué hora es? / ¿Qué horas tienes?','What time is it?','i'),
('Mi despertador suena a las seis y cuarto todos los días.','My alarm clock goes off at 6:15 everyday.','i'),
('Mi reloj no funciona.','My watch doesn''t work.','i'),
('Más o menos me acuesto a las diez de la noche, después del noticiero.','I go to bed around ten at night, after the news.','i'),
('No llegues tarde','Don''t get home late.','i'),
('No me gusta dormir en la tarde, por eso nunca tomo siesta.','I don''t like to sleep in the afternoon, that''s why I don''t take a nap.','i');


INSERT INTO vocabulab_notes (
  note, 
  card_id, 
  user_id
) VALUES
  (
    'THIS IS A BIG TEST.  NOTICE ME SO I CAN HELP TEST THINGS',
    1,
    2
  );
  

COMMIT;