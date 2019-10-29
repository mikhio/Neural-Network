import numpy as np
import json
import ast

def sigmod(x):
	return 1 / (1 + np.exp(-x))

training_inputs = np.array([
	[0, 0, 1],
	[1, 1, 1],
	[1, 0, 1],
	[0, 1, 1],
])

training_outputs = np.array([[0, 1, 1, 0]]).T

np.random.seed(1)

snyptic_weights = 2 * np.random.random((3, 1)) - 1

print("Random weights:")
print(snyptic_weights)



# Backpropagation method

for i in range(40000):
	input_layer = training_inputs
	outputs = sigmod( np.dot(input_layer, snyptic_weights) )

	err = training_outputs - outputs
	adjustments = np.dot(input_layer.T, err * (outputs * (1 - outputs)))

	snyptic_weights += adjustments


print("Weights after training:")
print(snyptic_weights)

print("Result after training:")
print(outputs)

# Tests
