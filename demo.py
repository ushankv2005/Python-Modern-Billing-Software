#ushanzz codezz

import eel
import mysql.connector
import numpy
from datetime import date
import time



eel.init('myWeb')

mydb = mysql.connector.connect(
         host = 'xxxxxxxxxxx',
         user = 'xxxxxxxx',
         passwd = "xxxxxxxxx",
         database = "xxxxxxxxxx"
 )
today = date.today()
dayy = str(today)
cursor = mydb.cursor()
timee = (time.strftime("%H:%M:%S"))
timeEka = str(timee)

today = date.today()
dayy = str(today)
cursor = mydb.cursor()
timee = (time.strftime("%H:%M:%S"))
timeEka = str(timee)

class fullProcess():

    @eel.expose
    def process1():
        sql1 = 'select * from category;'
        cursor.execute(sql1)
        record1 = cursor.fetchall()

        rowc = cursor.rowcount
        allcats = []

        cols = zip(*record1)
        cat = []
        for col in cols:
            arr = numpy.asarray(col)
            cat.append(arr)
        i= 0
        for i in range(rowc):
            allcats.append(arr[i])
            i = i+1
        mydb.commit()
        print(allcats)
        return allcats

    @eel.expose
    def sent(msg):
        catG = []
        catG.append(msg)
        print(catG)

        sql_stuff_cat = "SELECT * FROM sub_cat WHERE category_id=(SELECT id FROM category WHERE name=%s);"
        cursor.execute(sql_stuff_cat,catG)
        records = cursor.fetchall()
        cols = zip(*records)
        for col in cols:
            arr = numpy.asarray(col)
            catG.append(arr)
        print(records[0])
        return records
        del catG

    @eel.expose
    def sent2(msg):
        catG = []
        catG.append(msg)
        print(catG)

        sql_stuff_cat = "SELECT * FROM sub_sub_cat WHERE sub_cat_id=(SELECT id FROM sub_cat WHERE name=%s);"
        cursor.execute(sql_stuff_cat,catG)
        recordz = cursor.fetchall()
        cols = zip(*recordz)
        for col in cols:
            arr = numpy.asarray(col)
            catG.append(arr)
        print(recordz)
        return recordz
        del catG

    @eel.expose
    def sent3(msg):
        catG = []
        catG.append(msg)
        print(catG)

        sql_stuff_cat = "SELECT * FROM product WHERE sub_sub_cat_id=(SELECT id FROM sub_sub_cat WHERE name=%s);"
        cursor.execute(sql_stuff_cat,catG)
        recordz = cursor.fetchall()
        cols = zip(*recordz)
        for col in cols:
            arr = numpy.asarray(col)
            catG.append(arr)
        print(recordz)
        global miaK
        miaK = recordz
        return recordz
        del catG

    @eel.expose
    def pricetxt(msg):
        print(miaK[0][3])
        return miaK[0][3]

    @eel.expose
    def send_to_db(m,n,o,p,q,r):
        billideka = (p[0])
        cg = m
        
        pricee = q
        print(cg)
        gg = n
        minus = o
        origPrice = int(pricee[0])
        cursor.execute("SELECT qty FROM product WHERE sub_sub_cat_id in (SELECT id FROM sub_sub_cat WHERE name='"+cg[0]+"') AND name = '"+gg[0]+"';")
        recordz = cursor.fetchall()
        cols = zip(*recordz)
        catG=[]
        for col in cols:
            arr = numpy.asarray(col)
            catG.append(arr)
        fullstock = int(recordz[0][0])
        minusStock = int(minus[0])
        minusval = (fullstock-minusStock)
        al = ""
        if (minusval > 0):
            print('stock good')
            stringed = str(minusval)
            cursor.execute("UPDATE product SET qty='"+stringed+"' WHERE sub_sub_cat_id in (SELECT id FROM sub_sub_cat WHERE name='"+cg[0]+"') AND name = '"+gg[0]+"';")
            cursor.execute("SELECT qty FROM product WHERE sub_sub_cat_id in (SELECT id FROM sub_sub_cat WHERE name='"+cg[0]+"') AND name = '"+gg[0]+"';")
            disc = r[0]
            rcz = cursor.fetchall()
            cs = zip(*rcz)
            catt=[]
            for c in cs:
                rj = numpy.asarray(c)
                catt.append(rj)
            tp = str(minusStock*origPrice)
            print(tp)
            stringed2 = str(minusStock)
            productID =(miaK[0][0])
            cursor.execute("INSERT INTO sales (`qty`, `total_price`, `product_id`, `bill_no`,`bill_date`,`discount`,`bill_time`) VALUES ('"+stringed2+"','"+tp+"','"+productID+"','"+billideka+"','"+dayy+"','"+disc+"','"+timeEka+"'); ")
            mydb.commit()
            al = "Succesfully Added"
        else:
            al = "Unfortunately Your Stock Is Empty."
        return al

    @eel.expose
    def getprice(data,s,noo):
        ll = ""
        if data == '':
            ll = 0
            pr = (int(s[0])*int(noo[0]))
            c = pr+ll
        else:

            ll = int(data)
            xx = int(s[0])
            pr = (xx*int(noo[0]))
            c = pr+ll
        return c


eel.start('loading.html', size=(12000, 780))
