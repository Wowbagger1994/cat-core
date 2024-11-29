import * as cdk from "aws-cdk-lib";
import { CfnOutput } from "aws-cdk-lib";
import { CdkCheshireCat } from "cdk-cheshire-cat";
import { Construct } from "constructs";
import * as ecs from "aws-cdk-lib/aws-ecs";
import path = require("path");

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkCatStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const qdrantImage = ecs.ContainerImage.fromRegistry(
			"qdrant/qdrant:v1.7.2"
		);
		// You have to link the Dockerfile folder, for example ./core
		const catImage = ecs.ContainerImage.fromAsset(
			path.resolve(__dirname, "core")
		);

		const cheshireCat = new CdkCheshireCat(this, "CheshireCat", {
			customQdrantContainerImage: qdrantImage,
			customCatContainerImage: catImage,
			// Disable catPluginFolderInEFS to include local plugins
			catPluginFolderInEFS: false,
		});

		new CfnOutput(this, "CatHost", {
			value: cheshireCat.catEcsCluster.fargateService.loadBalancer
				.loadBalancerDnsName,
		});
		new CfnOutput(this, "QdrantHost", {
			value: cheshireCat.qdrantEcsCluster.fargateService.loadBalancer
				.loadBalancerDnsName,
		});
	}
}
