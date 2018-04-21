from itertools import combinations
import copy

# environment : python2
numSequence = 0
theta = 0
epsilon = 0
sequence = []
start = 0

def printFormat(l):
	# print l
	global start
	with open("zzhan147-output.txt","w") as f:
		for i in range(len(l)):
			for j in range(len(l[i])):
				if j != len(l[i])-1:
					print str(l[i][j])+", ",
					f.write(str(l[i][j])+", ")
				else:
					print l[i][j]
					f.write(str(l[i][j])+"\n")

def loadData(filename):
	theta = 0
	epsilon = 0
	sequence = []
	with open(filename,"r") as f:
		i = 0
		for line in f:
			if i == 0:
				temp = line[0:len(line)-1].split(",")
				theta = float(temp[0])
				epsilon = float(temp[1])
				i+=1
			else:
				if line != "\n" and line != "":
					temp = line[0:len(line)-1].split(",")
					append = []
					for i in range(len(temp)):
						append.append(int(temp[i]))
					sequence.append(append)
	return theta, epsilon, sequence

def frequentSequence(frequent, outlierMin):
	global numSequence
	global theta
	global epsilon
	global sequence

	firstScan(frequent, outlierMin)
	# print "finish first"
	# print frequent
	# print outlierMin
	otherScan(frequent, outlierMin)
	# print "finish second"
	printFormat(outlierMin)
	return
def firstScan(frequent, outlierMin):
	global sequence
	global numSequence
	global theta

	countDict = {}
	for i in range(len(sequence)):
		for j in range(len(sequence[i])):
			if sequence[i][j] not in countDict:
				countDict[sequence[i][j]] = 1
			else:
				countDict[sequence[i][j]] += 1
	add = []
	for key in countDict:
		# print countDict[key]
		if countDict[key] / numSequence >= theta:
			add.append([key])
			# print(add)
	add.sort()
	frequent.append(add)
	outlierMin += add
	return

def otherScan(frequent, outlierMin):
	global sequence
	global numSequence

	# generate the potential len + 1
	# test = 0
	while(1):
		newone = []
		prev = frequent[len(frequent)-1]
		for i in range(len(prev)):
			for j in range(len(prev)):
				if j == i:
					continue
				else:
					candi = []
					candi = candidate(prev[i],prev[j], newone, frequent)
					ret = scanBaseToCheck(candi, outlierMin)
					newone = newone + ret
		# print newone
		if newone == []:
			break
		else:
			frequent.append(newone)
		# print frequent , str(test)
		# test += 1
	return

def findMinOutlier2(c):
	global theta
	global epsilon
	global sequence
	number = 0

	for a in range(len(sequence)):
		if len(sequence[a]) < len(c):
			continue
		else:
			minOut = 10**12
			for i in range(len(sequence[a])):
				pattern = copy.copy(c)
				outlier = 0
				skipthis = False
				for j in range(i, len(sequence[a]),1):
					if pattern == []:
						break
					if sequence[a][j] in pattern:
						del pattern[pattern.index(sequence[a][j])]
					else:
						outlier += 1
					if pattern != [] and j == (len(sequence[a])-1):
						skipthis = True
				if skipthis == False:
					if outlier < minOut:
						minOut = outlier
					if outlier == 0:
						minOut = 0
						break
			if minOut / len(c) <= epsilon:
				number += 1
	# print number / float(len(sequence))
	if number / float(len(sequence)) >= theta:
		return True
	else:
		return False

def findMinOutlier1(c):
	global sequence
	global epsilon
	global theta

	number = 0
	for a in range(len(sequence)):
		c_list = c
		minOut = float("inf")
		indices_list = []
		combination_list = []
		for i in range(len(c)):
			indices_list.append([j for j, x in enumerate(sequence[a]) if x == c[i]])
		total_list = []
		for i in range(len(indices_list)):
			for j in range(len(indices_list[i])):
				total_list.append(indices_list[i][j])
		combination_list = list(combinations(total_list, len(c)))
		for i in range(len(combination_list)):
			corresponce = [0 for j in range(len(c))]
			for j in range(len(combination_list[i])):
				for k in range(len(indices_list)):
					if combination_list[i][j] in indices_list[k]:
						corresponce[k] = 1
			if 0 in corresponce:
				continue
			else:
				count_for_outliers = 0
				min_pos = min(combination_list[i])
				max_pos = max(combination_list[i])
				for j in range(min_pos+1, max_pos, 1):
					if sequence[a][j] not in c_list:
						count_for_outliers += 1
				if count_for_outliers < minOut:
					minOut = count_for_outliers
		new_epsilon = minOut / len(c)
		if new_epsilon <= epsilon:
			number += 1
	if number / len(sequence) >= theta:
		return True
	else:
		return False

def scanBaseToCheck(candidate, outlierMin):
	global theta
	global sequence
	global numSequence

	new_ret = []
	for i in range(len(candidate)):
		count = 0
		temp_list = candidate[i]
		for j in range(len(sequence)):
			someoneNotIn = False
			for k in range(len(temp_list)):
				if temp_list[k] not in sequence[j]:
					someoneNotIn = True
					break
			if someoneNotIn == False:
				count += 1
		if count / numSequence >= theta:
			# print count / numSequence
			# print candidate[i]
			new_ret.append(candidate[i])
			true_false = findMinOutlier2(candidate[i])
			# print true_false
			if true_false == True and (candidate[i] not in outlierMin):
				outlierMin.append(candidate[i])
			
	return new_ret

def candidate(x,y, newone, frequent):
	ret = []
	temp_candidate = []
	temp = []
	for i in range(len(x)):
		temp.append(x[i])
	for i in range(len(y)):
		if y[i] in temp:
			continue
		else:
			temp1 = copy.copy(temp)
			temp1.append(y[i])
			temp1.sort()
			if temp1 not in ret and temp1 not in newone:
				notAdd = False
				combination = list(combinations(temp1,len(temp1)-1))
				for k in range(len(combination)):
					temp_list = list(combination[k])
					if temp_list not in frequent[len(frequent)-1]:
						notAdd = True
						break
				if notAdd == False:
					ret.append(temp1)
	return ret

def patternMining():
	global numSequence
	global theta
	global epsilon
	global sequence
	outlierMin = []
	frequent = []

	theta, epsilon, sequence = loadData("data.txt")
	numSequence = float(len(sequence))
	frequentSequence(frequent, outlierMin)
	return

if __name__ == "__main__":
	patternMining()
