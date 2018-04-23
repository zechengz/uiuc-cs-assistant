import itertools
import sys
import copy

def getData(data):
	# file = "./backend/py/hin.txt"
	raw = []
	data = data.split("\n")
	classProDict = {}
	for elem in data:
		elem = elem.split(";")
		if (elem[1], elem[2]) not in classProDict:
			classProDict[(elem[1], elem[2])] = [int(elem[3]), float(elem[4])]
		else:
			classProDict[(elem[1], elem[2])][0] += int(elem[3])
			classProDict[(elem[1], elem[2])][1] += float(elem[4])
	for classPros in classProDict:
		c = classPros[0]
		pros = classPros[1]
		numberOfStudents = classProDict[classPros][0]
		gpa = classProDict[classPros][1]
		if int(c[2:5]) < 400 or line[2:5] == "421":
			continue
		else:
			line = [c, pros, numberOfStudents, gpa]
			# line[2] = int(line[2])
			# line[3] = float(line[3])
			raw.append(line)
	return raw

def column(matrix, i):
    return [row[i] for row in matrix]

def times(A, B):
	C = []
	for i in range(len(A)):
		C.append(A[i]*B[i])
	return C

class hin():
	def __init__(self):
		self.factor = None
		self.rx = None
		self.ry = None
		self.classList = None
		self.proList = None

	def fit(self, X, factor = 0.5):
		self.factor = factor
		# print(self.factor)
		self.construct(X)
		self.rx, self.ry = self.rankClus()
		self.sort()

	def construct(self, X):
		classList = []
		proList = []
		for elem in X:
			if elem[0] not in classList:
				classList.append(elem[0])
			if elem[1] not in proList:
				proList.append(elem[1])

		self.classList = classList
		self.proList = proList

		# for elem in X:


		# WXY = np.zeros([len(classList), len(proList)])
		# WYX = np.zeros([len(proList), len(classList)])
		# WYY = np.zeros([len(proList), len(proList)])

		WXY_each_row = [0 for i in range(len(proList))]
		WXY = [copy.copy(WXY_each_row) for i in range(len(classList))]

		WYX_each_row = [0 for i in range(len(classList))]
		WYX = [copy.copy(WYX_each_row) for i in range(len(proList))]

		WYY_each_row = [0 for i in range(len(proList))]
		WYY = [copy.copy(WYY_each_row) for i in range(len(proList))]

		maxStudents = [0 for i in range(len(proList))]
		for elem in X:
			proName = elem[1]
			number = elem[2]
			maxStudents[self.proList.index(proName)] += number
		maxStudents = max(maxStudents)

		# construct the matrices for WXY and WYX
		for elem in X:
			className = elem[0]
			proName = elem[1]
			number = elem[2]
			gpa = elem[3]

			gpa = gpa /4 * maxStudents
			gpa *= (1-self.factor)
			number *= self.factor
			score = gpa + number
			# print(score)

			classIndex = classList.index(className)
			proIndex = proList.index(proName)

			WXY[classIndex][proIndex] = score
			WYX[proIndex][classIndex] = score

		# for i in range(WXY.shape[1]):
		# 	column = studentDict1[:,i]
		# 	count = []
		# 	for elem in column:
		# 		if elem > 0:
		# 			count.append(elem)
		# 	count = np.array(count)
		# 	count /= sum(count)
		# 	c = 0
		# 	for j in range(len(WXY[:,i])):
		# 		if WXY[:,i][j] != 0:
		# 			WXY[:,i][j] /= count[c]
		# 			c += 1
			# print(self.proList[i],":", count)

		for i in range(len(WYX)):
			row = WYX[i]
			count = 0
			for elem in row:
				if elem > 0:
					count += 1
			for j in range(len(WYX[i])):
				WYX[i][j] /= count

		# construct the matrix for WYY
		for i in range(len(WXY)):
			indexList = []
			for j in range(len(WXY[i])):
				if WXY[i][j] != 0:
					indexList.append(j)
			combinations = [list(x) for x in itertools.combinations(indexList, 2)]
			for elem in combinations:
				WYY[elem[0]][elem[1]] += 1

		self.WYY = WYY
		self.WXY = WXY
		self.WYX = WYX
		return

	def rankClus(self):
		ry = [1 for i in range(len(self.proList))]
		rx = [1 for i in range(len(self.classList))]

		for t in range(2):
			for j in range(len(ry)):
				# * np.sum(self.WYY[j] * ry)
				ry[j] = (0.9 * sum(times(self.WYX[j],rx))) + (0.1 * sum(times(self.WYY[j], ry)))
			for i in range(len(rx)):
				count = 0
				for j in range(len(self.WXY[i])):
					if self.WXY[i][j] != 0:
						count += 1
				rx[i] = sum(times(self.WXY[i], ry))/count
			# classes = list(zip(rx, self.classList))
			# classes.sort(key=lambda tup: tup[0])
		return rx, ry

	def normalize(self, arr):
		arr = arr / np.sum(arr)
		return arr

	def sort(self):
		classes = list(zip(self.rx, self.classList))
		pros = list(zip(self.ry, self.proList))
		classes.sort(key=lambda tup: tup[0])
		pros.sort(key=lambda tup: tup[0])
		return

def select(track, classes):
	trackInfo = {'Basics':
		  ['cs100','cs101','cs105','cs125','cs126','cs173','cs196','cs199','cs210','cs225','cs233','cs241','cs242',
		  'cs296','cs357','cs361','cs374'],
		  'Software Foundations':
		  ['cs422','cs426','cs427','cs428','cs429','cs476','cs477','cs492','cs493','cs494','cs498 Software Testing','cs522','cs524','cs526','cs527','cs528','cs576'],
		  'Algorithms and Models of Computation':
		  ['cs413','cs473','cs475','cs476','cs477','cs481','cs482','cs571','cs572','cs573','cs574','cs575','cs576','cs579','cs583',
		  'cs584'],
		  'Intelligence and Big Data':
		  ['cs410','cs411','cs412','cs414','cs440','cs443','cs445','cs446','cs447','cs466','cs467','cs510','cs511','cs512','cs543',
		  'cs544','cs546','cs548','cs566','cs576','cs598 Mach Lrng for Signal Processng'],
		  'Human and Social Impact':
		  ['cs416','cs460','cs461','cs463','cs465','cs467','cs468','cs498 Art and Science of Web Prog','cs498RK','cs563','cs565'],
		  'Media':
		  ['cs414','cs418','cs419','cs445','cs465','cs467','cs498 Virtual Reality','cs519','cs565','cs598 Mach Lrng for Signal Processng'],
		  'Scientific, Parallel, and High Performance Computing':
		  ['cs419','cs450','cs457','cs466','cs482','cs483','cs484','cs519','cs554','cs555','cs556','cs558'],
		  'Distributed Systems, Networking, and Security':
		  ['cs423','cs424','cs425','cs431','cs436','cs438','cs439','cs460','cs461','cs463','cs483','cs484','cs523','cs524','cs525',
		  'cs538','cs563'],
		  'Machines':
		  ['cs423','cs424','cs426','cs431','cs433','cs484','cs523','cs526','cs533','cs536','cs541','cs584','cs598 Parallel Programming'],
		  'Group Project':
		  ['cs427','cs428','cs429','cs445','cs465','cs467','cs493','cs494']}
	ret_class = []
	trackClasses = []
	if track in trackInfo:
		trackClasses = trackInfo[track]
	count = 0
	for i in range(len(classes)-1, -1, -1):
		if classes[i][1][0:5].lower() in trackClasses and count < 4:
			ret_class.append(classes[i][1][0:5])
			count += 1
	# print ret_class
	return

def proClassDict(proList, raw):
	ret = {}
	for elem in raw:
		if elem[1] not in ret:
			ret[elem[1]] = [elem[0][0:5].lower()]
		else:
			if elem[0] not in ret[elem[1]]:
				ret[elem[1]].append(elem[0][0:5].lower())
	return ret

def select2(track, pcd, pros):
	trackInfo = {'Basics':
		  ['cs100','cs101','cs105','cs125','cs126','cs173','cs196','cs199','cs210','cs225','cs233','cs241','cs242',
		  'cs296','cs357','cs361','cs374'],
		  'Software Foundations':
		  ['cs422','cs426','cs427','cs428','cs429','cs476','cs477','cs492','cs493','cs494','cs498 Software Testing','cs522','cs524','cs526','cs527','cs528','cs576'],
		  'Algorithms and Models of Computation':
		  ['cs413','cs473','cs475','cs476','cs477','cs481','cs482','cs571','cs572','cs573','cs574','cs575','cs576','cs579','cs583',
		  'cs584'],
		  'Intelligence and Big Data':
		  ['cs410','cs411','cs412','cs414','cs440','cs443','cs445','cs446','cs447','cs466','cs467','cs510','cs511','cs512','cs543',
		  'cs544','cs546','cs548','cs566','cs576','cs598 Mach Lrng for Signal Processng'],
		  'Human and Social Impact':
		  ['cs416','cs460','cs461','cs463','cs465','cs467','cs468','cs498 Art and Science of Web Prog','cs498RK','cs563','cs565'],
		  'Media':
		  ['cs414','cs418','cs419','cs445','cs465','cs467','cs498 Virtual Reality','cs519','cs565','cs598 Mach Lrng for Signal Processng'],
		  'Scientific, Parallel, and High Performance Computing':
		  ['cs419','cs450','cs457','cs466','cs482','cs483','cs484','cs519','cs554','cs555','cs556','cs558'],
		  'Distributed Systems, Networking, and Security':
		  ['cs423','cs424','cs425','cs431','cs436','cs438','cs439','cs460','cs461','cs463','cs483','cs484','cs523','cs524','cs525',
		  'cs538','cs563'],
		  'Machines':
		  ['cs423','cs424','cs426','cs431','cs433','cs484','cs523','cs526','cs533','cs536','cs541','cs584','cs598 Parallel Programming'],
		  'Group Project':
		  ['cs427','cs428','cs429','cs445','cs465','cs467','cs493','cs494']}
	ret_pros = []
	trackClasses = []
	if track in trackInfo:
		trackClasses = trackInfo[track]
	count = 0
	for i in range(len(pros)-1, -1, -1):
		if pros[i][1] in pcd and count < 4:
			if len(intersection(pcd[pros[i][1]], trackClasses)) > 0:
				ret_pros.append(pros[i][1])
				count += 1
	# print ret_pros
	ret_pros = ";".join(ret_pros)
	return ret_pros

def intersection(lst1, lst2):
    lst3 = [value for value in lst1 if value in lst2]
    return lst3

if __name__ == "__main__":
	track = sys.argv[1]
	data = sys.argv[2]
	raw = getData(data)
	hin = hin()
	hin.fit(raw, factor = 0.2)
	classes = list(zip(hin.rx, hin.classList))
	classes.sort(key=lambda tup: tup[0])
	pros = list(zip(hin.ry, hin.proList))
	pros.sort(key=lambda tup: tup[0])
	# for i in range(len(classes)-1, -1, -1):
	# 	print classes[i][1],":",classes[i][0]
	# for i in range(len(pros)-1, -1, -1):
	# 	print pros[i][1],":",pros[i][0]
	pcd = proClassDict(hin.proList, raw)
	# ret = select(track, classes)
	ret2 = select2(track, pcd, pros)
	print ret2
