import pandas as pd
import numpy as np
import requests as rq
import matplotlib.pyplot as plt
from datetime import datetime
import schedule
import time

def getManifestData(url): # gets manifest data
    manifestData = rq.get(url).json()
    manifestData = manifestData['photo_manifest'] # pandas
    return manifestData

class dailyPhotos:
    def __init__(self,data):
        self.manifestData = data
        self.sol = self.getSol()
        self.url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol='+ str(self.sol) + '&api_key=kQwoyoXi4rQeY0lXWt1RZln6mLeatlYKLmYfGENB'
        self.imagesData = self.getImagesJSON()

    def getSol(self):
        self.sol = self.manifestData['max_sol']
        return self.sol

    def getImagesJSON(self):
        self.imagesData = rq.get(self.url).json()
        self.imagesData = self.imagesData['photos'] # returns a list of all img dictionaries
        return self.imagesData

    def getURLData(self): # asks for a list of indexes
        self.getImagesJSON()
        self.listURL = []
        for j in range(len(self.imagesData)):
            self.imageURL = self.imagesData[j]['img_src'] # retrieves all photos
            if self.imagesData[j]['camera']['name'] != 'SKYCAM':
                self.listURL.append(self.imageURL)
        self.dataImages = {'urls':self.listURL}
        self.dataImages = pd.DataFrame(data=self.dataImages)
        return self.dataImages

    def getCurrentPicture(self):
        currentPicture = self.getURLData()
        currentPicture = currentPicture.loc[int(len(currentPicture['urls']))-1,'urls']
        return currentPicture

class posMap:
    def __init__(self,manifestData):
        self.url = 'https://mars.nasa.gov/mmgis-maps/M20/Layers/json/M20_waypoints.json'
        self.manifestData = manifestData
        self.posData = self.getPosData()
    def getPosData(self):
        self.posData = rq.get(self.url)
        self.posData = self.posData.json()
        self.posData = self.posData['features'] # gets all position data
        return self.posData
    def getWaypoints(self):
        self.coords = []
        self.waypointData = self.posData
        for i in range(len(self.waypointData)):
            self.coords.append([self.waypointData[i]['properties']['lon'],self.waypointData[i]['properties']['lat'],self.waypointData[i]['properties']['sol']]) #add lat and long to a list
        self.coords = np.array(self.coords)
        self.coords = pd.DataFrame(self.coords) # data frame
        return self.coords
    def getDistance(self):
        self.distances = []
        self.distanceData = self.posData
        for i in range(len(self.distanceData)):
            self.distances.append([self.distanceData[i]['properties']['dist_m'],self.distanceData[i]['properties']['sol']])
        self.distances = np.array(self.distances)
        self.distances = pd.DataFrame(self.distances) #data frame
        return self.distances

#Images dataframe
def getImagesData():
    now = datetime.now()
    imagesDF = dailyPhotos.getURLData()
    imagesDF['sol'] = dailyPhotos.sol
    #imagesDF.to_csv('/Users/aguilarcarboni/Desktop/Coding/CTDS/NASA/React/public/Assets/CSV/imageData.csv',index = False)
    #imagesDF.to_csv('C:/Users/Agui/Desktop/Coding/NASA/React/public/Assets/CSV/imageData.csv',index = False)
    imagesDF.to_csv('/home/andres/React/public/Assets/CSV/imageData.csv', index = False)
    print('Current Image Alive', now)
    return imagesDF

#Coordinates dataframe
def getCoordinateData():
    now = datetime.now()
    waypointData = posMap.getWaypoints()

    #Data frames
    waypointData.columns = ('lon','lat','sol')
    waypointData['lon'] = waypointData['lon'].astype(float)
    waypointData['lat'] = waypointData['lat'].astype(float)
    waypointData['sol'] = waypointData['sol'].astype(int)

    #CSV
    #waypointData.to_csv('/Users/aguilarcarboni/Desktop/Coding/CTDS/NASA/React/public/Assets/CSV/waypoints.csv',index = False) #coords csv
    #waypointData.to_csv('C:/Users/Agui/Desktop/Coding/NASA/React/public/Assets/CSV/waypoints.csv',index = False)
    waypointData.to_csv('/home/andres/React/public/Assets/CSV/waypointData.csv', index = False)
    print('Location alive', now)
    return waypointData

#Matplotlib plot
def positionGraph():
    waypointData = getCoordinateData()
    x = waypointData['lon']
    y = waypointData['lat']

    plt.plot(x,y,marker = '.')
    plt.title('Rover path')
    plt.xlabel('Longitude')
    plt.ylabel('Latitude')
    plt.show()


#Call manifest
manifestURL = 'https://api.nasa.gov/mars-photos/api/v1/manifests/perseverance/?api_key=kQwoyoXi4rQeY0lXWt1RZln6mLeatlYKLmYfGENB'
manifestData = getManifestData(manifestURL) # function inside object

#Call class
dailyPhotos = dailyPhotos(manifestData)
posMap = posMap(manifestData)

def demo():
    imagesData = getImagesData()
    coordinatesData = getCoordinateData()
    print(coordinatesData)
    print(imagesData)
    
def onTimer(): #only run for constant updates
    schedule.every(12).hours.do(getImagesData)
    schedule.every(12).hours.do(getCoordinateData)

    while True:
        schedule.run_pending()
        time.sleep(1)

#demo()
#positionGraph()
onTimer()
