import itertools
import sys
import copy

def getData():
	file = "hin.txt"
	raw = []
	with open (file, "r") as f:
		for line in f:
			line = line[0:len(line)-1]
			if int(line[2:5]) < 400 or line[2:5] == "421" or int(line[2:5]) > 500:
				continue
			else:
				line = line.split("\t")
				line[2] = int(line[2])
				line[3] = float(line[3])
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

if __name__ == "__main__":
	raw = getData()
	hin = hin()
	hin.fit(raw, factor = 0.2)
	classes = list(zip(hin.rx, hin.classList))
	classes.sort(key=lambda tup: tup[0])
	pros = list(zip(hin.ry, hin.proList))
	pros.sort(key=lambda tup: tup[0])
	for i in range(len(classes)-1, -1, -1):
		print classes[i][1],":",classes[i][0]
	for i in range(len(pros)-1, -1, -1):
		print pros[i][1],":",pros[i][0]