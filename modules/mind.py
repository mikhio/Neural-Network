import numpy as np
import json
import ast



def sigmod(x):
	return 1 / (1 + np.exp(-x))


def trainNN(trainInt, trainOut):
	training_inputs = np.array(trainArr)

	training_outputs = np.array(trainOut).T

	np.random.seed(1)

	snyptic_weights = 2 * np.random.random((2500, 1)) - 1



	# Backpropagation method

	for i in range(40000):
		input_layer = training_inputs
		outputs = sigmod( np.dot(input_layer, snyptic_weights) )

		err = training_outputs - outputs
		adjustments = np.dot(input_layer.T, err * (outputs * (1 - outputs)))

		snyptic_weights += adjustments

	print("Result after training:")
	print(outputs)

	return snyptic_weights 