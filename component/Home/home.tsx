import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RNFS from 'react-native-fs';
import { Alert } from 'react-native';
import {Svg, Circle, Path} from 'react-native-svg';

const FileDownloadDemo = () => {

  const [percentage, setPercentage] = React.useState<number>(0);

  const size = 100;
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = 100 - percentage;

  const downloadFileBegin = () => {
    console.log('Download Begin');
  };

  const downloadFileProgress = (data: any) => {
    console.log('data',data,((100 * data.bytesWritten) / data.contentLength));
    setPercentage(((100 * data.bytesWritten) / data.contentLength) | 0);
    console.log('$$$$$$$$$$', percentage);
  };

  const handleDownload = async () => {
    try {
      const downloadPath = RNFS.DownloadDirectoryPath + '/sample-image.jpg';

      RNFS.downloadFile({
        begin: downloadFileBegin,
        progress: downloadFileProgress,
        fromUrl: 'https://images.unsplash.com/photo-1702579454504-999228374c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwNDYxODMyOQ&ixlib=rb-4.0.3&q=80&w=1080',
        toFile: downloadPath,
      })
        .promise.then((result) => {
          console.log('Download successful:', result);
          setPercentage(100);
          // Alert.alert('File downloaded successfully');
        })
        .catch((error) => {
          console.log('Failed to download file:', error);
          // Alert.alert('File download failed');

        });
    } catch (error) {
      console.log('FILE DOWNLOAD FAILED:', error);
      Alert.alert('Download failed', 'There was an error while downloading the image.');
    }
  };

  useEffect(() => {
    // Optional: Perform any cleanup or additional logic after the download
    return () => {
      console.log('Component will unmount. Clean up if needed.');
    };
  }, []);

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <View style={{paddingBottom:30}}> 
            <TouchableOpacity onPress={handleDownload} >
              <Text >Start Download</Text>
            </TouchableOpacity>
          
          </View>
       <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          stroke="#D9D9D9"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <Circle
          stroke="#00C282"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${circum} ${circum}`}
          strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
    
  );
};

export default FileDownloadDemo;
