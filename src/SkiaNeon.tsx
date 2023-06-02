import {useMemo} from 'react';
import {zColor} from '@remotion/zod-types';
import {
	Blur,
	Fill,
	fitbox,
	Group,
	LinearGradient,
	mix,
	Paint,
	Path,
	processTransform2d,
	rect,
	Skia,
	topLeft,
	topRight,
} from '@shopify/react-native-skia';
import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

const CLAMP = {
	extrapolateLeft: 'clamp',
	extrapolateRight: 'clamp',
} as const;
const PADDING = 200;
const src = rect(0, 0, 2630, 1325);

const duration = 15;

export const durationInFrames = 500;

const color1 = '#3FCEBC';
const color2 = '#9F5EE2';
const color3 = '#FF645E';

export const SkiaNeon: React.FC<{
	color1: string;
	color2: string;
}> = ({color1, color2}) => {
	const config = useVideoConfig();
	const frame = useCurrentFrame();

	const defaultPath = useMemo(() => {
		return [
			{
				path: 'M337 1240.85C255.37 1240.85 172.05 1218.91 95.1298 1176.32C66.9098 1160.69 56.6998 1125.15 72.3198 1096.92C87.9498 1068.7 123.49 1058.49 151.72 1074.11C234.05 1119.7 324.75 1134.72 407.1 1116.45C477.65 1100.79 536.83 1061.09 565.4 1010.25C617.62 917.33 559.54 810.94 410.02 725.65C336.2 683.54 280.74 631.74 245.18 571.68C212.25 516.07 197.94 455.14 203.79 395.47C213.51 296.33 278.64 212.57 369.71 182.08C421.12 164.87 556.28 141.83 700.95 299.09C722.79 322.83 721.25 359.78 697.51 381.62C673.77 403.46 636.82 401.92 614.98 378.18C545.69 302.86 469.82 271.77 406.8 292.85C359.34 308.74 325.29 353.49 320.06 406.85C316.65 441.64 325.52 478.05 345.71 512.15C370.81 554.54 411.93 592.23 467.91 624.16C574.82 685.15 646.14 757.33 679.89 838.69C711.63 915.24 707.15 996.48 667.25 1067.47C622 1147.98 536.41 1207.39 432.43 1230.48C401.23 1237.4 369.25 1240.83 337.02 1240.83L337 1240.85Z',
				colors: [color1, color2],
				index: 0,
			},
			{
				path: 'M1138.92 165.17C1125.9 125.9 1100.15 98.6697 1066.34 88.2997C1066.14 88.2397 1065.95 88.1797 1065.75 88.1197C1065.49 88.0397 1065.23 87.9497 1064.96 87.8797C1064.64 87.7897 1064.32 87.7097 1064 87.6297C1063.73 87.5597 1063.46 87.4697 1063.18 87.3997C1062.87 87.3197 1062.55 87.2497 1062.24 87.1697C1062.15 87.1497 1062.05 87.1197 1061.96 87.0997C1040.54 81.8797 1007.17 81.1697 967.75 106.09C891.72 154.14 830.47 272.56 799.7 430.97C799.68 431.07 799.66 431.18 799.64 431.28C769.5 591.02 751.09 706.7 731.14 858.61C722.6 870.22 713.82 881.99 704.78 893.95C685.33 919.69 690.42 956.31 716.16 975.77C716.19 975.8 716.23 975.82 716.26 975.85C709.28 1032.39 701.81 1094.79 693.38 1165.81C689.58 1197.84 712.46 1226.89 744.5 1230.7C746.84 1230.98 749.16 1231.12 751.46 1231.11C780.64 1231.11 805.86 1209.28 809.39 1179.58C822.37 1070.29 833.06 981.6 843.14 903.34C960.33 741.27 1045.64 593.18 1097.09 462.37C1146.92 335.67 1161.39 232.9 1138.93 165.18L1138.92 165.17ZM1032.19 245.01C1031.2 271.29 1024.98 317.02 1000.98 385.66C980.77 443.45 945.19 525.07 882.67 631.12C891.9 575.39 902.18 517.89 914.4 453.08C934.24 351.05 963.83 289.29 985.17 255.44C1003.33 226.64 1019.19 212.04 1029.05 205.47C1031.03 212.97 1032.92 225.48 1032.19 245V245.01Z',
				colors: [color1, color2],
				index: 1,
			},
			{
				path: 'M1246.01 751.92C1216.67 697.39 1154.11 667.2 1078.76 671.2C1022.69 674.16 969.23 694.8 924.14 730.88C811.16 821.29 767.19 948.76 720.64 1083.72C712.89 1106.19 704.87 1129.44 696.42 1152.91C685.49 1183.26 701.24 1216.73 731.59 1227.66C738.13 1230.01 744.81 1231.13 751.38 1231.13C775.31 1231.13 797.76 1216.31 806.34 1192.49C815.06 1168.28 823.21 1144.66 831.08 1121.82C852.41 1059.97 871.6 1004.37 895.37 955.61C903.22 971.03 917.79 982.83 936.08 986.46C968.61 992.9 999.52 996.13 1028.64 996.13C1059.83 996.13 1088.95 992.43 1115.77 985.04C1165.24 971.41 1205.23 945.47 1231.42 910.02C1266.98 861.89 1272.57 801.32 1246.01 751.95V751.92ZM1137.47 840.57C1116.69 868.69 1058.83 891.67 958.78 871.85C955.24 871.15 951.71 870.8 948.23 870.75C962.59 853.1 978.69 836.86 997.14 822.09C1023.04 801.36 1053.4 789.53 1084.93 787.86C1113.56 786.36 1135.88 793.79 1143.14 807.28C1148.14 816.57 1146.02 829.02 1137.47 840.58V840.57Z',
				colors: [color1, color2],
				index: 2,
			},
			{
				path: 'M1167.59 1233.04C1136.47 1233.04 1108.1 1223.88 1084.19 1205.9C1064.31 1190.94 1048.84 1170.33 1039.46 1146.27C1029.78 1121.46 1023.59 1098.02 1018.13 1077.33C1002.02 1016.32 997.16 997.91 936.65 986.55C904.94 980.6 884.07 950.07 890.02 918.37C895.97 886.66 926.51 865.79 958.2 871.74C1091.27 896.72 1113.34 980.33 1131.08 1047.52C1135.97 1066.04 1141.03 1085.2 1148.29 1103.8C1149.76 1107.57 1151.94 1110.68 1154.42 1112.55C1156.37 1114.01 1162.32 1118.48 1179.67 1114.84C1228.36 1104.61 1296.65 1044.56 1320.74 1001.66C1321.59 1000.14 1322.51 998.66 1323.49 997.23C1376.98 919.19 1420.98 830.07 1463.53 743.88C1469.6 731.58 1475.65 719.32 1481.71 707.14C1496.07 678.25 1531.13 666.47 1560.01 680.83C1588.9 695.19 1600.67 730.25 1586.32 759.13C1580.31 771.22 1574.3 783.38 1568.28 795.59C1524.27 884.74 1478.77 976.9 1421.22 1061.26C1402.19 1094.21 1370.6 1130.22 1334.14 1160.47C1303.75 1185.69 1256.44 1218.07 1203.69 1229.16C1191.33 1231.76 1179.26 1233.05 1167.59 1233.05V1233.04Z',
				colors: [color1, color2],
				index: 3,
			},
			{
				path: 'M1601.65 572.24C1636.16 572.24 1664.14 544.262 1664.14 509.75C1664.14 475.237 1636.16 447.26 1601.65 447.26C1567.14 447.26 1539.16 475.237 1539.16 509.75C1539.16 544.262 1567.14 572.24 1601.65 572.24Z',
				colors: [color1, color2],
				index: 3,
			},
			{
				path: 'M1511.21 1238.1C1503.01 1238.1 1494.83 1237.45 1486.7 1236.04C1443.64 1228.58 1409.99 1201.23 1391.95 1159.04C1376.17 1122.15 1372.12 1074.7 1379.55 1013.96C1379.76 1012.21 1380.06 1010.47 1380.43 1008.75C1395.57 938.52 1428.06 841.28 1479.76 711.5C1491.7 681.53 1525.66 666.92 1555.64 678.86C1585.61 690.8 1600.22 724.77 1588.28 754.74C1540.36 875.03 1509.05 967.87 1495.19 1030.76C1489.42 1080.34 1495.29 1103.59 1499.35 1113.1C1502.38 1120.19 1504.16 1120.5 1506.63 1120.93C1523.36 1123.86 1569.02 1110.02 1626.23 1060.1C1677.06 1015.74 1715.89 960.521 1725.14 919.401C1741 848.951 1781.33 784.81 1838.73 738.79C1893.38 694.98 1959.88 669.801 2025.97 667.901C2084.23 666.231 2138.75 682.72 2183.55 715.6C2231.88 751.08 2267.59 805.29 2286.8 872.37C2295.68 903.38 2277.74 935.72 2246.73 944.61C2215.72 953.48 2183.38 935.55 2174.49 904.54C2143.84 797.5 2070.38 783.53 2029.34 784.68C1954.14 786.85 1861.91 843.79 1839.12 945.06C1824.33 1010.77 1773.46 1086.68 1703.05 1148.13C1670.37 1176.65 1590.67 1238.1 1511.21 1238.11V1238.1Z',
				colors: [color1, color2],
				index: 4,
			},
			{
				path: 'M2286.16 675.26C2255.06 666.73 2222.91 685.03 2214.38 716.14L2211.32 727.28C2210.46 730.42 2209.58 733.63 2208.68 736.87C2200.66 729.13 2192.19 721.97 2183.29 715.46C2138.39 682.59 2083.77 666.15 2025.4 667.91C1959.3 669.9 1892.86 695.12 1838.31 738.92C1780.97 784.96 1740.77 849.11 1725.11 919.55C1724.83 920.81 1724.59 922.09 1724.39 923.36C1708.24 1028.61 1737.66 1118.39 1807.24 1176.16C1839.86 1203.25 1880.49 1221.91 1924.71 1230.12H1924.73C1942.3 1233.39 1960.16 1235 1978.09 1235C2027.12 1235 2076.58 1222.94 2121.39 1199.62C2125.2 1197.64 2129.03 1195.54 2132.77 1193.37C2209.9 1148.71 2262.85 1068.33 2274.42 978.37C2284.09 903.15 2307.12 819.41 2323.93 758.26L2327.01 747.04C2335.54 715.93 2317.24 683.79 2286.13 675.26H2286.16ZM2074.25 1092.27C2072.03 1093.56 2069.77 1094.8 2067.51 1095.98C2029.31 1115.86 1986.18 1122.72 1946.08 1115.27H1946.07C1921.4 1110.69 1899.2 1100.67 1881.88 1086.28C1844.95 1055.62 1830.34 1006.11 1839.58 943.03C1862.75 843.16 1954.15 786.92 2028.92 784.67C2068.42 783.5 2137.85 796.27 2170.53 891.91C2165.76 915.72 2161.62 939.79 2158.58 963.47C2151.62 1017.58 2120.1 1065.72 2074.25 1092.27V1092.27Z',
				colors: [color1, color2],
				index: 5,
			},
			{
				path: 'M2307.12 1230.36C2239.76 1230.36 2179.25 1184.68 2161.93 1116.04C2134.29 1006.54 2179.86 841.33 2210.02 732C2211.53 726.54 2212.99 721.24 2214.39 716.14C2222.92 685.03 2255.06 666.72 2286.17 675.26C2317.28 683.79 2335.58 715.93 2327.05 747.04C2325.64 752.2 2324.16 757.55 2322.64 763.07C2297.39 854.63 2255.12 1007.86 2275.21 1087.45C2279.75 1105.43 2296.98 1116.54 2314.43 1112.73C2357.91 1103.27 2416.67 1052.05 2457.32 988.17C2474.64 960.95 2510.74 952.94 2537.96 970.25C2565.18 987.57 2573.2 1023.67 2555.88 1050.89C2530.23 1091.2 2498.67 1128.31 2464.63 1158.21C2423.02 1194.74 2380.85 1217.85 2339.27 1226.89C2328.49 1229.24 2317.73 1230.36 2307.14 1230.36H2307.12Z',
				colors: [color1, color2],
				index: 6,
			},
		];
	}, [color1, color2]);

	const dst = rect(
		PADDING,
		PADDING,
		config.width - PADDING * 2,
		config.height - PADDING * 2
	);
	const progresses = [
		interpolate(frame, [0, duration], [0, 1], CLAMP),
		interpolate(frame, [duration, 2 * duration], [0, 1], CLAMP),
		interpolate(frame, [2 * duration, 3 * duration], [0, 1], CLAMP),
		interpolate(frame, [3 * duration, 4 * duration], [0, 1], CLAMP),
		interpolate(frame, [4 * duration, 5 * duration], [0, 1], CLAMP),
		interpolate(frame, [5 * duration, 6 * duration], [0, 1], CLAMP),
		interpolate(frame, [6 * duration, 7 * duration], [0, 1], CLAMP),
	];

	const paths = defaultPath.map((def) => {
		const path = Skia.Path.MakeFromSVGString(def.path)!;
		path.transform(processTransform2d(fitbox('contain', src, dst)));
		const bounds = path.computeTightBounds();
		const {colors} = def;
		return {
			path,
			bounds,
			colors,
			progress: progresses[def.index]!,
		};
	});
	const b1 = 8;
	const b2 = 1.75;
	const progress8 = progresses[progresses.length - 1]!;
	const blur1 = mix(progress8, b1 * 2, b1);
	const blur2 = mix(progress8, b2 * 2, b2);
	return (
		<>
			<Fill color="black" />
			{paths.map(({path, colors, bounds, progress}, i) => (
				<React.Fragment key={i}>
					<Group clip={path}>
						<Fill color={`rgba(0,0,0, ${progress})`} />
					</Group>
					<Path
						path={path}
						color="transparent"
						strokeCap="round"
						strokeJoin="round"
						end={progress}
					>
						<Paint style="stroke" strokeWidth={15}>
							<LinearGradient
								colors={colors}
								start={topLeft(bounds)}
								end={topRight(bounds)}
							/>
							<Blur
								blur={interpolate(progress, [0, 0.5, 1], [0, blur1 * 2, blur1])}
							/>
						</Paint>
						<Paint style="stroke" strokeWidth={4}>
							<LinearGradient
								colors={colors}
								start={topLeft(bounds)}
								end={topRight(bounds)}
							/>
							<Blur
								blur={interpolate(progress, [0, 0.5, 1], [0, blur2 * 2, blur2])}
							/>
						</Paint>
						<Paint style="stroke" strokeWidth={1}>
							<LinearGradient
								colors={colors}
								start={topLeft(bounds)}
								end={topRight(bounds)}
							/>
						</Paint>
						<Paint style="stroke" strokeWidth={2.5} color="white" />
					</Path>
				</React.Fragment>
			))}
		</>
	);
};
